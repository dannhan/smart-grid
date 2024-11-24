import * as React from "react";
import type { NextPage } from "next";

import ElectricComponent from "@/components/Dashboard/ElectricComponent";

// TODO: searchParams and route type safety
interface Props {
  params: { room: string };
  searchParams: Record<string, string>;
}

const ManageRoomPage: NextPage<Props> = ({ params }) => {
  return (
    <main className="flex min-h-screen min-w-[580px] flex-1 flex-col gap-4 px-4 py-8 @container">
      <h2 className="text-2xl font-bold capitalize">
        {params.room.replace(/-/g, " ")}
      </h2>
      <ElectricComponent roomId={params.room} />
    </main>
  );
};

export default ManageRoomPage;
