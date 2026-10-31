import { auth } from "@/auth";
import Navbar from "@/components/application/header/navbar";
import { type Session } from "next-auth";
import { redirect } from "next/navigation";

type newSessionType = Session & {
  logout?: boolean;
};

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const session: newSessionType | null = await auth();
  
  if (!session) {
    redirect("/sign-in");
  }

  if (session.logout === true) {
    redirect("/logout");
  }

  return (
 
      <div className="min-h-screen w-full">
        <Navbar />
        {children}
      </div>
  );
};

export default AppLayout;
