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
  const { data: voltValue } = useRealtimeList<Measurement>(
    db,
    "monitor/voltages/realtime",
    orderByKey(),
    limitToLast(1),
  );
  const { data: currentValue } = useRealtimeList<Measurement>(
    db,
    "monitor/currents/realtime",
    orderByKey(),
    limitToLast(1),
  );

  return (
    <div className="gap grid w-full grid-cols-2 grid-rows-2 justify-items-end gap-x-6 gap-y-6 xl:gap-x-12">
      <SensorStatusCard title="Voltage" unit="Volts" icon={Voltmeter}>
        {(voltValue && voltValue[0].value) || ""}
      </SensorStatusCard>
      <SensorStatusCard title="Smoke" unit="Secure" icon={Smoke}>
        No Smoke
      </SensorStatusCard>
      <SensorStatusCard title="Currents" unit="Ampere" icon={Amperemeter}>
        {currentValue && currentValue[0].value
          ? `≈${currentValue[0].value}`
          : ""}
      </SensorStatusCard>
      <SensorStatusCard title="Flame" unit="Secure" icon={Flame}>
        No Flame
      </SensorStatusCard>
    </div>
  );
};

export default SensorStatus;
