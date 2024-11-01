import type { FC } from "react";

import { Card } from "@/components/shadcn/card";
import { ScrollArea } from "@/components/shadcn/scroll-area";

const DashboardSideinfo: FC = () => {
  return (
    <aside className="sticky top-16 hidden h-[calc(100svh-4rem)] w-80 py-8 pr-2 md:block">
      {/* TODO: is scrollarea necessary? */}
      <ScrollArea className="h-full w-full flex-col rounded-md pr-2">
        <Card className="h-72" />
        <Card className="mb-1 mt-8 h-72" />
      </ScrollArea>
    </aside>
  );
};

export default DashboardSideinfo;
