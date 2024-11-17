"use client";

import { lazy, type FC, type PropsWithChildren } from "react";
import { redirect, usePathname } from "next/navigation";

// TODO: improve
//
import { useWindowSize } from "@/hooks/useWindowSize";
import LoadingOverlay from "@/components/Common/LoadingOverlay";

const DashboardHeader = lazy(
  () => import("@/components/Dashboard/DashboardHeader"),
);
const DashboardSidenav = lazy(
  () => import("@/components/Dashboard/DashboardSidenav"),
);
const DashboardSideinfo = lazy(
  () => import("@/components/Dashboard/DashboardSideinfo"),
);
const MobileNav = lazy(() => import("@/components/MobileNav"));

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const windowSize = useWindowSize();
  const path: string = usePathname().split("/").pop() || "";

  if (windowSize.width === null) {
    return <LoadingOverlay />;
  }

  if (windowSize.width >= 640) {
    return (
      <>
        <DashboardHeader />
        <div className="mx-auto flex w-full max-w-screen-xl flex-1 justify-between">
          <DashboardSidenav />
          {children}
          {windowSize.width >= 1024 && <DashboardSideinfo />}
        </div>
      </>
    );
  }

  if (path !== "home" && path !== "ar") {
    redirect("/dashboard/home");
  }

  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-1 flex-col justify-between">
      {children}
      <MobileNav path={path} />
    </div>
  );
};

export default DashboardLayout;