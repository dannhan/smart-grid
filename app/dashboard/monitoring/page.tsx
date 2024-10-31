import { ChartComponent } from "@/components/BarChart";

const MonitoringPage = () => {
  return (
    <main className="flex flex-1 flex-col gap-8 px-4 py-8">
      <ChartComponent />
      <ChartComponent />
      <ChartComponent />
    </main>
  );
};

export default MonitoringPage;
