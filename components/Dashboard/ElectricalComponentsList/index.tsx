import * as React from "react";
import { notFound } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";

import type { Room } from "@/types";
import { Skeleton } from "@/components/shadcn/skeleton";
import { firestore } from "@/lib/firebase/database";

import ElectricalComponentCard from "./ElectricalComponentCard";

interface Props {
  roomId: string;
}

const ElectricalComponentsList: React.FC<Props> = async ({ roomId }) => {
  // Fetch the room data
  const roomSnap = await getDoc(doc(firestore, "rooms", roomId));
  if (!roomSnap.exists()) return notFound();

  // Fetch all the document from componentRefs
  const roomData = roomSnap.data() as Room;

  // TODO: better skeleton ui
  return roomData.componentRefs.map((compRef) => (
    <React.Suspense
      key={compRef.id}
      fallback={<Skeleton className="h-[447px] rounded-xl bg-card shadow" />}
    >
      <ElectricalComponentCard
        key={compRef.id}
        roomId={roomId}
        docReference={compRef}
      />
    </React.Suspense>
  ));
};

export default ElectricalComponentsList;
