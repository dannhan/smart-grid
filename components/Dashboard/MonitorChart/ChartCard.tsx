import * as React from "react";
import { LoaderCircle } from "lucide-react";

import { FormattedChartData } from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import ChartMode from "./ChartMode";
import ChartContent from "./ChartContent";

interface ChartProps {
  title: string;
  data: FormattedChartData;
  loading: boolean;
}

const ChartCard: React.FC<ChartProps> = ({ title, data, loading }) => {
  const [activeChart, setActiveChart] = React.useState<"realtime" | "hourly">(
    "realtime",
  );

  return (
    <Card className="relative overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-card/90 z-10">
          <LoaderCircle className="animate-spin text-priary" size={60} strokeWidth={2.8} />
        </div>
      )}

      <CardHeader className="flex flex-col items-stretch pb-0">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <ChartMode activeChart={activeChart} setActiveChart={setActiveChart} />
      </CardHeader>
      <CardContent>
        <ChartContent mode={activeChart} tooltipLabel={title} data={data} />
      </CardContent>
    </Card>
  );
};

export default ChartCard;
