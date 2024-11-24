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

const ElectricComponentCard: React.FC<Component> = ({
  id,
  type,
  name,
  properties,
}) => {
  const pathname = usePathname();
  const Icon = {
    lamp: Lamp,
    socket: Socket,
  }[type];

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <Icon className="mx-auto w-[80px]" />
      </CardHeader>
      <CardContent className="flex w-full flex-1 gap-3">
        <ul>
          {Object.keys(properties).map((key) => (
            <li key={key}>{key}</li>
          ))}
        </ul>
        <ul>
          {Object.values(properties).map((value) => (
            <li key={value}>: {value}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-auto flex-col gap-2">
        <Button className="w-full rounded-full" asChild>
          <Link href={`${pathname}/${id}?action=repair`}>Repair</Link>
        </Button>
        <Button className="w-full rounded-full" asChild>
          <Link href={`${pathname}/${id}?action=change`}>Change</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ElectricComponentCard;
