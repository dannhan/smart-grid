import * as React from "react";
import type { NextPage } from "next";

import ElectricComponent from "@/components/Dashboard/ElectricComponent";

const ManageRoomPage: NextPage = () => {
  return (
    // TODO: change all min-w for main page to be 580px
    <main className="flex min-h-screen min-w-[580px] flex-1 flex-col gap-8 px-4 py-8 @container">
      <ElectricComponent />
    </main>
  );
};

export default ManageRoomPage;
