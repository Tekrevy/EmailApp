import mongoose, { Schema } from "mongoose";




type passwordResetType = {
  code: number;
  expires: Date;
};

type last = {
  login: Date;
  used: Date;
  passwordReset?: Date;
};

type locationType = {
  city?: string;
  state?: string;
  zipcode?: string;
  country?: string;
  timezone?: string;
  coords: {
    lat?: string;
    lng?: string;
  };
};

export interface UserInterface extends mongoose.Document {
  firstName: string;
  lastName: string;
  isGoogleAccount: Boolean;
  googleId?: string;
  emailVerified?: Boolean;
  image?: String;
  email: string;
  password?: string;
  last: last;
  passwordReset: passwordResetType;
}

const UserSchema = new mongoose.Schema<UserInterface>(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    isGoogleAccount: {
      type: Boolean,
      required: true,
    },
    googleId: {
      type: String,
    },

    emailVerified: {
      type: Boolean,
    },

    image: {
      type: String,
    },

    email: {
      type: String,
      required: [true, "Please provide valid email"],
    },
    password: {
      type: String,
      minlength: [5, "At least 5"],
    },

    last: {
      login: {
        type: Schema.Types.Date,
      },
      used: {
        type: Schema.Types.Date,
      },
      passwordReset: {
        type: Schema.Types.Date,
      },
    },

    passwordReset: {
      code: {
        type: Schema.Types.Number,
      },
      expires: {
        type: Schema.Types.Date,
      },
    },
  },
  { timestamps: true }
);



export default mongoose.models?.User ||
  mongoose.model<UserInterface>("User", UserSchema);
