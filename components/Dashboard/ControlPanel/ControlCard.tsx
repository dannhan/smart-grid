import type { FC } from "react";

import { Lightbulb } from "lucide-react";

import { Room } from "@/types";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Switch } from "@/components/shadcn/switch";

import { useControlContext } from "@/providers/ControlProvider";
import Socket from "@/components/Icon/Socket";

interface ControlCardProps {
  roomId: string;
  room: Room;
}

const ControlCard: FC<ControlCardProps> = ({ roomId, room }) => {
  const { toggleSwitch } = useControlContext();

  return (
    <Card className="relative min-w-40">
      <CardHeader className="px-5 py-4">
        <CardTitle className="text-2xl">{room.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-5 text-xl">
        <div className="flex items-center">
          <Lightbulb className="mr-2 size-7" />
          <p className="text-2xl">Lamp</p>
          <Switch
            className="ml-auto"
            checked={!!room.lamp}
            onCheckedChange={() => toggleSwitch(roomId, "lamp")}
          />
        </div>

        <div className="flex items-center">
          <Socket className="mr-2 size-7" />
          <p className="text-2xl">Socket</p>
          <Switch
            className="ml-auto"
            checked={!!room.socket}
            onCheckedChange={() => toggleSwitch(roomId, "socket")}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ControlCard;
