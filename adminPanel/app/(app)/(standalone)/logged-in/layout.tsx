import { auth } from "@/auth";
import { redirect } from "next/navigation";

const LoggedInLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/sign-in");
  }

  return <div>{children}</div>;
};

export default LoggedInLayout;
