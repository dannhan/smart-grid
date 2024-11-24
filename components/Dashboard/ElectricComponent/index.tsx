"use client";

import * as React from "react";
import { doc, getDoc } from "firebase/firestore";

import type { Rooms, Component } from "@/types";
import { Skeleton } from "@/components/shadcn/skeleton";
import ElectricComponentCard from "./ElectricComponentCard";
import { firestore } from "@/lib/firebase/database";

interface Props {
  roomId: string;
}

// TODO: maybe better fetching strategy (server-side?, cache?)
const ElectricComponent: React.FC<Props> = ({ roomId }) => {
  const [data, setData] = React.useState<Rooms | undefined>();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getDoc(doc(firestore, "rooms", roomId))
      .then((snap) => snap.data() as Rooms)
      .then(async (rooms) => {
        const components = await Promise.all(
          rooms.componentsRef!.map(async (componentRef) => {
            const componentSnap = await getDoc(componentRef);
            return {
              id: componentSnap.id,
              ...componentSnap.data(),
            } as Component;
          }),
        );
        delete rooms.componentsRef;
        rooms.components = components;
        setData(rooms);
      })
      .catch(() => {
        alert("An error occured. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="grid w-full grid-cols-2 gap-4 @xl:gap-8">
      {loading ? (
        <>
          {/* TODO: better loading ui */}
          <Skeleton className="h-[447px] rounded-xl bg-card shadow" />
          <Skeleton className="h-[447px] rounded-xl bg-card shadow" />
        </>
      ) : (
        data &&
        data.components?.map((component) => (
          <ElectricComponentCard key={component.id} {...component} />
        ))
      )}
    </div>
  );
};

export default ElectricComponent;
