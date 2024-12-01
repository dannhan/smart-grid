"use client";

import * as React from "react";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";

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
      .then((snap) => snap.data() as Rooms | undefined)
      .then(async (rooms) => {
        if (!rooms) return;

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
      .catch((error) => {
        console.log(error);
        toast.error("An error occurd");
      })
      .finally(() => setLoading(false));
  }, [roomId]);

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
