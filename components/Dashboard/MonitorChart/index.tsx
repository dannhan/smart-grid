"use client";

import * as React from "react";

import { RawChartData, FormattedChartData } from "@/types";
import useRealtimeData from "@/hooks/useReatimeData";
import ChartCard from "./ChartCard";

import { db } from "@/lib/firebase/database";

// TODO: path
const MonitorChart: React.FC = () => {
  const { data, loading } = useRealtimeData<RawChartData>(db, "monitor/voltages");

  const formattedData: FormattedChartData = data ? {
    realtime: Object?.entries(data.realtime).map(([id, datum]) => ({ id, ...datum })),
    hourly: Object?.entries(data.hourly).map(([id, datum]) => ({ id, ...datum })),
  } : {
    realtime: [],
    hourly: [],
  };

  return (
    <ChartCard title="Voltages" data={formattedData} loading={loading} />
  );
}

export default MonitorChart;
