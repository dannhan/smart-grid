"use client";

import * as React from "react";
import { doc, getDoc } from "firebase/firestore";

import type { Rooms, Component } from "@/types";
import { firestore } from "@/lib/firebase/database";
import ElectricComponentCard from "./ElectricComponentCard";

interface Props {
  roomId: string;
}

// TODO:
// maybe better fetching strategy (server-side?, cache?)
// add skeleton ui and loading ui
const ElectricComponent: React.FC<Props> = ({ roomId }) => {
  const [data, setData] = React.useState<Rooms | undefined>();

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
      });
  }, []);

  return (
    <div className="grid w-full grid-cols-2 gap-4 @xl:gap-8">
      {data &&
        data.components?.map((component) => (
          <ElectricComponentCard key={component.id} {...component} />
        ))}
    </div>
  );
};

export default ElectricComponent;
