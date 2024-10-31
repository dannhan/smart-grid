import type { FC, PropsWithChildren } from "react";

import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import DashboardSidenav from "@/components/Dashboard/DashboardSidenav";
import DashboardSideinfo from "@/components/Dashboard/DashboardSideinfo";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <DashboardHeader />
    <div className="mx-auto flex w-full max-w-screen-xl flex-1 justify-between">
      <DashboardSidenav />
      {children}
      <DashboardSideinfo />
    </div>
  </>
);

export default DashboardLayout;
