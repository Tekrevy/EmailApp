import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google, { GoogleProfile } from "next-auth/providers/google";
import dbConnect from "@/lib/dbConnect";
import User, { UserInterface } from "@/models/User";
import bcrypt from "bcryptjs";

type credentialsType = {
  newAccount: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type userTypeSignInCallback = {
  id: string;
  email: string;
  name: string;
  image: string;
  error?: string;
};

class CustomAuthError extends CredentialsSignin {
  constructor(message: string, code?: string) {
    super(message);
    this.code = code || "Adeel_error";
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({

  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(cred) {
        const credentials = cred as credentialsType;
        const isNewAccount = credentials?.newAccount === "true";

        try {
          await dbConnect();

          const existingUser = await User.findOne({
            email: credentials?.email?.trim().toLowerCase(),
          });

          if (isNewAccount) {
            if (existingUser) {
              throw new Error("ACCOUNT_EXIST");
            }
            let hashedPassword = await bcrypt.hash(
              credentials?.password.trim(),
              12
            );
            const newUser: UserInterface = new User({
              firstName: credentials?.firstName.trim(),
              lastName: credentials?.lastName.trim(),
              emailVerified: false,
              image: "",
              isGoogleAccount: false,
              last: {
                login: new Date(),
                used: new Date(),
              },
              email: credentials?.email.toLocaleLowerCase().trim(),
              password: hashedPassword,
            });

            await newUser.save();
            // signUpEmailSendHandler(newUser.email, newUser.firstName);
            return {
              id: newUser._id.toString(),
              email: newUser.email,
              name: `${newUser.firstName} ${newUser.lastName}`,
              image: newUser.image,
            };
          } else {
            if (!existingUser) {
              throw new Error("NOT_AUTHORIZED");
            }
            if (existingUser.isGoogleAccount) {
              throw new Error("GOOGLE_ACCOUNT_EXIST");
            }
            const isPasswordValid = await bcrypt.compare(
              credentials?.password.trim(),
              existingUser.password
            );
            if (isPasswordValid) {
              existingUser.last = {
                ...existingUser.last,
                login: new Date(),
                used: new Date(),
              };
              await existingUser.save();
              return {
                id: existingUser._id.toString(),
                email: existingUser.email,
                name: `${existingUser.firstName} ${existingUser.lastName}`,
                image: existingUser.image,
              };
            } else {
              throw new Error("NOT_AUTHORIZED");
            }
          }
        } catch (err) {
          console.log("err in authorize callback", JSON.stringify(err, null, 2));
          const error = err as { message: string };
          return {
            id: "",
            image: "",
            name: "",
            email: "",
            error: error?.message as string,
          };
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const newUser = user as userTypeSignInCallback;
      if (newUser.error) {
        throw new CustomAuthError(newUser.error, newUser.error);
      }

      if (account?.provider === "google") {
        const newProfile = profile as GoogleProfile;

        try {
          await dbConnect();

          const existingUser = await User.findOne({ googleId: newProfile.sub });

          if (existingUser) {
            existingUser.lastLogin = new Date();
            await existingUser.save();
            return true;
          } else {
            const newUser = new User({
              firstName: newProfile?.given_name,
              lastName: newProfile?.family_name,
              googleId: user?.id,
              EmailVerified: newProfile?.email_verified,
              image: newProfile?.picture,
              email: profile?.email,
              isGoogleAccount: true,
              last: {
                login: new Date(),
                used: new Date(),
              },
            });

            await newUser.save();
            return true;
          }
        } catch (err) {
          // console.error("Google signin error:", err);
          return false;
        }
      } else {
        return true;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      try {
        await dbConnect();
        
        const existingUser = await User.findOne({
          email: session.user?.email?.trim(),
        });

        if (existingUser) {
          // Update last used timestamp
          existingUser.last = {
            ...existingUser.last,
            used: new Date(),
          };
          await existingUser.save();

          return { 
            ...session, 
            user: {
              ...session.user,
              id: token.id as string,
              createdAt: existingUser.createdAt,
            },
            logout: false 
          };
        } else {
          return {
            ...session,
            user: {
              name: "",
              email: "",
              image: "",
            },
            expires: new Date().toDateString(),
            logout: true,
          };
        }
      } catch (error) {
        // console.error("Session callback error:", error);
        return {
          ...session,
          user: {
            name: "",
            email: "",
            image: "",
          },
          expires: new Date().toDateString(),
          logout: true,
        };
      }
    },
  },
});
