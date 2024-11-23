import * as React from "react";
import type { NextPage } from "next";

import ElectricComponent from "@/components/Dashboard/ElectricComponent";

const ManageRoomPage: NextPage = () => {
  return (
    <main className="flex min-h-screen min-w-[580px] flex-1 flex-col gap-8 px-4 py-8 @container">
      <ElectricComponent />
    </main>
  );
};

export default ManageRoomPage;
