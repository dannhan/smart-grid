import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Component } from "@/types";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/shadcn/card";
import { Button } from "@/components/shadcn/button";
import Lamp from "@/components/Icon/Lamp";
import Socket from "@/components/Icon/Socket";
import { ImageIcon } from "lucide-react";

const ElectricComponentCard: React.FC<Component> = ({
  id,
  type,
  name,
  properties,
}) => {
  const pathname = usePathname();
  // TODO: change to proper icon
  const Icon = {
    lamp: Lamp,
    socket: Socket,
    wire: ImageIcon,
    mcb: ImageIcon,
  }[type];

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <Icon className="mx-auto w-[80px]" />
      </CardHeader>
      <CardContent className="flex w-full flex-1 gap-3">
        <ul>
          {properties.map((property: Record<string, string>) => (
            <li
              key={JSON.stringify(property)}
              className="line-clamp-1 capitalize leading-8"
            >
              {Object.keys(property)[0].replace("-", " ")}
            </li>
          ))}
        </ul>
        <ul>
          {properties.map((property: Record<string, string>) => (
            <li
              key={JSON.stringify(property)}
              className="line-clamp-1 capitalize leading-8"
            >
              : {Object.values(property)[0].replace("-", " ")}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-auto flex-col gap-2">
        {/* TODO: what about using new URL? */}
        <Button className="w-full rounded-full" asChild>
          <Link href={`${pathname}/${id}?action=repair`}>Repair</Link>
        </Button>
        <Button className="w-full rounded-full" asChild>
          <Link href={`${pathname}/${id}?action=change&type=${type}`}>
            Change
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ElectricComponentCard;
