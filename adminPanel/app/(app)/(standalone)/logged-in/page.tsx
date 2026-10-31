"use client";

import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import PageLoader from "@/components/ui/page-loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

const LoggedInPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const getUserDashboard = useCallback(async () => {
    try {
      router.replace("/application");
    } catch (error) {
    } finally {
    }
  }, []);

  useEffect(() => {
    if (session?.user?.email) {
      getUserDashboard();
    }
  }, [getUserDashboard, session?.user?.email]);

  return (
    <MaxWidthWrapper className="min-h-screen pt-10 pb-20">
      <PageLoader text="Powering up MR. AI Model..." />
    </MaxWidthWrapper>
  );
};

export default LoggedInPage;
