
"use client";

import PageLoader from "@/components/ui/page-loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Call the logout API route
        const response = await fetch("/api/auth/logout");
        
        if (response.ok) {
          // The API route will handle the redirect
          // But we can also redirect here as fallback
          router.push("/sign-in");
        } else {
          // If API fails, redirect anyway
          router.push("/sign-in");
        }
      } catch (error) {
        console.error("Logout error:", error);
        // Fallback redirect
        router.push("/sign-in");
      }
    };

    // Add a small delay to show the loading message
    const timer = setTimeout(() => {
      handleLogout();
    }, 100);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <PageLoader text="Session expired, logging out..." />
    </div>
  );
} 