"use client";

import * as React from "react";
import { doc, getDoc } from "firebase/firestore";

import type { Rooms, Component } from "@/types";
import { firestore } from "@/lib/firebase/database";
import ElectricComponentCard from "./ElectricComponentCard";

// TODO:
// pass params from parent
// maybe better fetching strategy
const ElectricComponent: React.FC = () => {
  const [data, setData] = React.useState<Rooms | undefined>();

  React.useEffect(() => {
    getDoc(doc(firestore, "rooms", "room-a"))
      .then((snap) => snap.data() as Rooms)
      .then(async (rooms) => {
        const components = await Promise.all(
          rooms.componentsRef!.map(async (componentRef) => {
            // TODO: return await getDoc(componentRef).then((data) => data.data());
            const componentSnap = await getDoc(componentRef);
            return componentSnap.data() as Component;
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
    <div className="@xl:gap-8 grid w-full grid-cols-2 gap-4">
      {data &&
        data.components?.map((component) => (
          <ElectricComponentCard
            key={component.name}
            type={component.type}
            name={component.name}
            properties={component.properties}
          />
        ))}
    </div>
  );
};

export default ElectricComponent;
