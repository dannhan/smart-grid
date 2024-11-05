import type { FC } from "react";

import { Bell } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { ScrollArea } from "@/components/shadcn/scroll-area";
import Touch from "@/components/Icon/Touch";

const DashboardSideinfo: FC = () => {
  return (
    <aside className="sticky top-16 hidden h-[calc(100svh-4rem)] w-80 py-8 pr-2 md:block">
      {/* TODO: is scrollarea necessary? */}
      <ScrollArea className="mb-1 h-full w-full flex-col rounded-md pr-2">
        <Card className="h-72">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-bold">
              <Bell className="h-4 w-4" />
              <span>Notification</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8">
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-400" />
                <span className="leading-none">Secure</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-yellow-400" />
                <span className="leading-none">
                  Under Voltages, May Damage Your Devices!
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="mt-8 h-72">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-bold">
              <Touch className="size-4" />
              <span>Quick Access</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8"></CardContent>
        </Card>
      </ScrollArea>
    </aside>
  );
};

export default DashboardSideinfo;
