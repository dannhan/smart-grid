import type { FC } from "react";

import Chart from "@/components/BarChart";
import SensorStatus from "@/components/Dashboard/SensorStatus";

const DashboardPage: FC = () => {
  return (
    <main className="flex min-h-screen min-w-[540px] flex-1 flex-col gap-8 px-4 py-8">
      <SensorStatus />
      <Chart title="Power Consumption" />
    </main>
  );
};

export default DashboardPage;
