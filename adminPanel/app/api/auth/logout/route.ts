import { signOut } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Clear the session
    await signOut({ redirect: false });
    
    // Create response with cleared cookies
    const response = NextResponse.json({ success: true });
    
    // Clear auth cookies
    response.cookies.delete("next-auth.session-token");
    response.cookies.delete("next-auth.csrf-token");
    response.cookies.delete("next-auth.callback-url");
    response.cookies.delete("__Secure-next-auth.session-token");
    response.cookies.delete("__Secure-next-auth.csrf-token");
    response.cookies.delete("__Secure-next-auth.callback-url");
    
    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ success: false, error: "Logout failed" }, { status: 500 });
  }
} 