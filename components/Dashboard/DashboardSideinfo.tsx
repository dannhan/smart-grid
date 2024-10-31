import type { FC } from "react";

import { Card } from "@/components/shadcn/card";
import { ScrollArea } from "@/components/shadcn/scroll-area";

const DashboardSideinfo: FC = () => {
  return (
    <aside className="sticky top-16 h-[calc(100svh-4rem)] w-80 py-8">
      {/* TODO: is scrollarea necessary? */}
      <ScrollArea className="h-full w-full flex-col rounded-md pr-2">
        <Card className="h-72" />
        <Card className="mt-8 h-72" />
      </ScrollArea>
    </aside>
  );
};

export default DashboardSideinfo;
