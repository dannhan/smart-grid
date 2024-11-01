import Link from "next/link";

import { ChevronRightIcon, Lightbulb } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Switch } from "@/components/shadcn/switch";
import OfficeBuildings from "@/components/Icon/OfficeBuildings";

import { rooms } from "@/lib/config";

const ControlPage = () => {
  return (
    <main className="flex flex-1 flex-col gap-8 px-4 py-8">
      <div className="gap grid w-full grid-cols-2 grid-rows-2 gap-x-12 gap-y-6">
        {/* TODO: href */}
        {rooms.map((room) => (
          <Link href={"#"} key={room}>
            <Card className="relative">
              <CardHeader className="px-5 py-4">
                <CardTitle className="text-2xl">Room</CardTitle>
                <ChevronRightIcon
                  className="absolute right-4 top-3 size-5"
                  strokeWidth={2.5}
                />
              </CardHeader>
              <CardContent className="flex justify-around gap-4 px-5 text-xl">
                <p className="text-7xl font-bold">{room}</p>
                <OfficeBuildings />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default ControlPage;
