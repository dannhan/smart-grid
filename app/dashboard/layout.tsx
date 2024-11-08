import type { FC, PropsWithChildren } from "react";

import { ControlProvider } from "@/providers/ControlProvider";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import DashboardSidenav from "@/components/Dashboard/DashboardSidenav";
import DashboardSideinfo from "@/components/Dashboard/DashboardSideinfo";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => (
  <ControlProvider>
    <DashboardHeader />
    <div className="mx-auto flex w-full max-w-screen-xl flex-1 justify-between">
      <DashboardSidenav />
      {children}
      <DashboardSideinfo />
    </div>
  </ControlProvider>
);

export default DashboardLayout;
