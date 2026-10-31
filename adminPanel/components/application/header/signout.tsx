"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

const Signout = () => {
  return (
    <button
      onClick={() => signOut()}
      className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors cursor-pointer text-left"
    >
      <LogOut className="h-4 w-4 text-muted-foreground" />
      <div className="flex-1">
        <p className="text-sm font-medium">Sign Out</p>
        <p className="text-xs text-muted-foreground">Log out of your account</p>
      </div>
    </button>
  );
};

export default Signout;
