import { ShieldX, MailWarning } from "lucide-react";



export const authErrors = [
  {
    serverError: "NOT_AUTHORIZED",
    title: "Invalid Credentials",
    description: "Invalid email address and/or password",
    icon: MailWarning,
  },

  {
    serverError: "AccessDenied",
    title: "Invalid Credentials",
    description: "Invalid email address and/or password",
    icon: MailWarning,
  },

  {
    serverError: "GOOGLE_ACCOUNT_EXIST",
    title: "Heads up!",
    description:
      "Account exists already. Please signin with google by clicking the button below",
    icon: ShieldX,
  },

  {
    serverError: "ACCOUNT_EXIST",
    title: "Warning!",
    description: "Account exists. Please log in instead",
    icon: ShieldX
  },

  {
    serverError: "GOOGLE_ACCOUNT_PASSWORD_RESET",
    title: "Google Account Exist for this Email",
    description: "Please log with your google account",
    icon: ShieldX
  },

  {
    serverError: "NO_ACCOUNT_EXIST",
    title: "No Account with this email exist",
    description: "Please create a new account",
    icon: MailWarning
  },

  {
    serverError: "INVALID_CODE",
    title: "Invalid Code",
    description: "Please enter valid password reset code",
    icon: MailWarning
  },

  {
    serverError: "CODE_EXPIRED",
    title: "Passcode Expired",
    description: "Your passcode expired. Please generate a new one",
    icon: MailWarning
  },

  {
    serverError: "NO_ACCOUNT",
    title: "Invalid Email",
    description: "There is not account associated with this email.",
    icon: MailWarning
  },
];
