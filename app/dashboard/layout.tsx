import type { FC, PropsWithChildren } from "react";

import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex flex-col">
    <DashboardHeader />
    <div className="flex flex-1 py-4">
      <DashboardSidebar />
      {children}
    </div>
  </div>
);

export default DashboardLayout;
