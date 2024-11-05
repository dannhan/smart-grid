import Chart from "@/components/BarChart";

const MonitoringPage = () => {
  return (
    <main className="flex flex-1 flex-col gap-8 px-4 py-8">
      <Chart title="Voltages" />
      <Chart title="Current" />
      <Chart title="Power Consumption" />
    </main>
  );
};

export default MonitoringPage;
