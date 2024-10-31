import Link from "next/link";

import { ChevronRightIcon, Lightbulb } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";

import { controlRooms } from "@/lib/config";
import Socket from "@/components/Icon/Socket";
import { Switch } from "@/components/shadcn/switch";

const ControlPage = () => {
  return (
    <main className="flex flex-1 flex-col gap-8 px-4 py-8">
      <div className="gap grid w-full grid-cols-2 grid-rows-2 gap-x-12 gap-y-6">
        {/* TODO: href */}
        {controlRooms.map((room) => (
          <Link href={"#"} key={room}>
            <Card className="relative">
              <CardHeader className="px-5 py-4">
                <CardTitle className="text-2xl">{room}</CardTitle>
                <ChevronRightIcon
                  className="absolute right-4 top-3 size-5"
                  strokeWidth={2.5}
                />
              </CardHeader>
              <CardContent className="flex flex-col gap-4 px-5 text-xl">
                <div className="flex items-center">
                  <Lightbulb className="mr-2 size-7" />
                  <p className="text-2xl">Lamp</p>
                  <Switch className="ml-auto" />
                </div>

                <div className="flex items-center">
                  <Socket className="mr-2 size-7" />
                  <p className="text-2xl">Socket</p>
                  <Switch className="ml-auto" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        <Link href={"#"}>
          <Card className="relative">
            <CardHeader className="px-5 py-4">
              <CardTitle className="text-2xl">Others</CardTitle>
              <ChevronRightIcon
                className="absolute right-4 top-3 size-5"
                strokeWidth={2.5}
              />
            </CardHeader>
            <CardContent className="flex flex-col gap-4 px-5 text-xl">
              <div className="flex items-center">
                <Lightbulb className="mr-2 size-7" />
                <p className="text-2xl">Corr. Lamp</p>
                <Switch className="ml-auto" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </main>
  );
};

export default ControlPage;
