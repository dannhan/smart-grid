import * as React from "react";

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
}

const ChartCard: React.FC<ChartProps> = ({ title, data }) => {
  const [activeChart, setActiveChart] = React.useState<"realtime" | "hourly">(
    "realtime",
  );

  return (
    <Card>
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
