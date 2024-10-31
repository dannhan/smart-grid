import type { FC } from "react";
import { Card } from "@/components/shadcn/card";

const DashboardSideinfo: FC = () => {
  return (
    <aside className="hidden h-full w-80 flex-col gap-8 px-4 md:flex">
      <Card className="flex-1"></Card>
      <Card className="flex-1"></Card>
    </aside>
  );
};

export default DashboardSideinfo;
