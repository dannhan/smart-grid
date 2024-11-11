"use client";

import { FC } from "react";

import { useControlContext } from "@/providers/ControlProvider";
import ControlCard from "./ControlCard";

// TODO: better loading ui
const ControlPanel: FC = () => {
  const { rooms, loading, error } = useControlContext();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!rooms) return <div>No data available</div>;

  return (
    <div className="gap grid w-full grid-cols-2 grid-rows-2 gap-x-12 gap-y-6">
      {Object.entries(rooms).map(([roomId, room]) => (
        <ControlCard key={roomId} roomId={roomId} room={room} />
      ))}
    </div>
  );
};

export default ControlPanel;
