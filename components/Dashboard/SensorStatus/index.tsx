"use client";

import * as React from "react";
import { limitToLast, orderByKey } from "firebase/database";

import { Measurement } from "@/types";

import useRealtimeList from "@/hooks/useRealtimeList";
import Smoke from "@/components/Icon/Smoke";
import Flame from "@/components/Icon/Flame";
import Voltmeter from "@/components/Icon/Voltmeter";
import Amperemeter from "@/components/Icon/Amperemeter";
import SensorStatusCard from "./SensorStatusCard";

import { db } from "@/lib/firebase/database";

const SensorStatus: React.FC = () => {
  // PERF: this hook is not optimal
  const { data: volt } = useRealtimeList<Measurement>(
    db,
    "monitor/voltages/realtime",
    orderByKey(),
    limitToLast(1),
  );
  const { data: current } = useRealtimeList<Measurement>(
    db,
    "monitor/currents/realtime",
    orderByKey(),
    limitToLast(1),
  );

  return (
    <div className="gap grid w-full min-w-[324px] grid-cols-2 grid-rows-2 gap-x-3 gap-y-3 sm:gap-x-6 sm:gap-y-6 xl:gap-x-12">
      <SensorStatusCard
        title="Voltage"
        unit="Volts"
        icon={Voltmeter}
        className="order-first max-sm:text-white max-sm:shadow-[15px_20px_20px_0px_rgba(0,_0,_0,_0.15)] max-sm:bg-primary-gradient"
      >
        {(volt && volt[0].value) || ""}
      </SensorStatusCard>
      <SensorStatusCard
        title="Current"
        unit="Ampere"
        icon={Amperemeter}
        className="sm:order-3"
      >
        {current?.[0]?.value ? `≈ ${current[0].value}` : ""}
      </SensorStatusCard>
      <SensorStatusCard
        title="Flame"
        unit="Secure"
        icon={Flame}
        className="sm:order-4"
      >
        No Flame
      </SensorStatusCard>
      <SensorStatusCard
        title="Smoke"
        unit="Secure"
        icon={Smoke}
        className="sm:order-2"
      >
        No Smoke
      </SensorStatusCard>
    </div>
  );
};

export default SensorStatus;
