import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  LayoutDashboard,
  Settings,
  User,
  Pencil,
  Edit2
} from "lucide-react";
import Link from "next/link";
import DropDownThemeToggle from "./drowDownThemeToggle";
import Signout from "./signout";

const UserButton = async () => {
  const session = await auth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-auto px-3 rounded-full border border-border/50 hover:border-border transition-all duration-200 hover:shadow-sm"
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={session?.user?.image ?? ""}
                alt={session?.user?.name ?? "User"}
              />
              <AvatarFallback className="bg-linear-to-br from-primary to-primary/80 text-white text-sm font-medium">
                {session?.user?.name ? (
                  session.user.name[0].toUpperCase()
                ) : (
                  <User className="h-4 w-4" />
                )}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:flex flex-col items-start">
              <span className="text-sm font-medium text-foreground leading-none">
                {session?.user?.name || "User"}
              </span>
              <span className="text-xs text-muted-foreground leading-none">
                @{session?.user?.name || session?.user?.email || "user"}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 p-0 border-border/50 shadow-lg"
        align="end"
        sideOffset={8}
      >
        {/* User Profile Section */}
        <div className="p-4 border-b border-border/50 hover:bg-accent/50 transition-colors duration-200">
          <div className="flex flex-col items-center text-center space-y-2">
            <Link
              href="/application/settings/profile"
              className="relative group cursor-pointer"
            >
              <Avatar className="h-12 w-12 transition-transform duration-200 group-hover:scale-105 group-hover:shadow-md">
                <AvatarImage
                  src={session?.user?.image ?? ""}
                  alt={session?.user?.name ?? "User"}
                />
                <AvatarFallback className="bg-linear-to-br from-primary to-primary/80 text-white font-semibold text-sm transition-all duration-200 group-hover:from-primary/90 group-hover:to-primary/70">
                  {session?.user?.name ? (
                    session.user.name[0].toUpperCase()
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Pencil className="h-4 w-4 text-white" />
              </div>
            </Link>

            <div className="space-y-0.5 text-center">
              <h3 className="text-sm font-semibold text-foreground transition-colors duration-200 hover:text-primary">
                {session?.user?.name || "User"}
              </h3>
              <p className="text-xs text-muted-foreground transition-colors duration-200 hover:text-foreground/80">
                @{session?.user?.name || session?.user?.email || "user"}
              </p>
              <p className="text-xs text-muted-foreground transition-colors duration-200 hover:text-foreground/80">
                {session?.user?.email || "user@example.com"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="p-1">
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link
              href="/application"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
            >
              <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Dashboard</p>
                <p className="text-xs text-muted-foreground">
                  View your dashboard
                </p>
              </div>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="cursor-pointer">
            <Link
              href="/application/settings/profile"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
            >
              <Edit2 className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Edit Profile</p>
                <p className="text-xs text-muted-foreground">
                  Update your profile information
                </p>
              </div>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="cursor-pointer">
            <Link
              href="/settings"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
            >
              <Settings className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Settings</p>
                <p className="text-xs text-muted-foreground">
                  Manage your account settings
                </p>
              </div>
            </Link>
          </DropdownMenuItem>
        </div>
        {/* Theme Toggle */}

        <DropDownThemeToggle />
        <DropdownMenuSeparator />

        {/* Sign Out */}
        <div className="p-1">
          <Signout />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
