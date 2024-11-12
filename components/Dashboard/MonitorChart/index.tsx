"use client";

import * as React from "react";

import { RawChartData, FormattedChartData } from "@/types";
import useRealtimeData from "@/hooks/useReatimeData";
import ChartCard from "./ChartCard";

import { db } from "@/lib/firebase/database";

const MonitorChart: React.FC = () => {
  // TODO: only fetch the last 24 data, might see:
  // might see: https://github.com/CSFrequency/react-firebase-hooks/blob/master/database/README.md#uselist
  const { data, loading } = useRealtimeData<RawChartData>(
    db,
    "monitor/voltages",
  );

  const formattedData: FormattedChartData = {
    realtime: data?.realtime
      ? Object.entries(data?.realtime).map(([id, datum]) => ({ id, ...datum }))
      : [],
    hourly: data?.hourly
      ? Object?.entries(data?.hourly).map(([id, datum]) => ({ id, ...datum }))
      : [],
  };

  return <ChartCard title="Voltages" data={formattedData} loading={loading} />;
};

export default MonitorChart;
