import { Metadata } from "next";
import { redirect } from "next/navigation";

import UserSignupForm from "@/components/auth/signup/userSignupForm";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";

const SignupPage = async () => {
  const session = await auth();

  if (session && session?.user?.email !== "" ) {
    redirect("/logged-in");
  }

  return (
    <>
      <div className="pt-5 container relative min-h-screen flex-col items-center justify-center lg:grid lg:max-w-none lg:grid-cols-6 lg:px-0 md:pt-0">
        <div className="relative hidden min-h-full flex-col justify-center items-center bg-muted text-white dark:border-r lg:flex lg:col-span-4">
          <div className="absolute inset-0 bg-zinc-900" />
        </div>
        <div className="lg:p-8 lg:col-span-2">
          <p className="font-extrabold text-2xl lg:text-4xl text-center">
            Welcome to
          </p>
          <Link
            href={"/"}
            className="w-full flex justify-center items-center pb-5"
          >
            <Image
              src="/logo.png"
              width={175}
              height={25}
              alt="Minutes Resume"
            />
          </Link>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] p-4">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign Up for a new account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password to sign up
              </p>
            </div>

            <UserSignupForm />
            <p className="px-8 text-center text-sm text-muted-foreground pb-6 lg:pb-0">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms-of-service"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
