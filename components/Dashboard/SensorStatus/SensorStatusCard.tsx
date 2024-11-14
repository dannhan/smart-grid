import * as React from "react";
import Link from "next/link";

import { ChevronRightIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";

interface Props {
  title: string;
  unit: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const SensorStatusCard: React.FC<React.PropsWithChildren & Props> = ({
  title,
  unit,
  icon: Icon,
  children,
}) => {
  return (
    <Link
      href="monitoring"
      key={title}
      className="relative w-full max-w-80 justify-self-start font-bold"
    >
      <Card>
        <CardHeader className="px-5 pb-0 pt-4">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <ChevronRightIcon
            className="absolute right-4 top-3 size-5"
            strokeWidth={2.5}
          />
        </CardHeader>
        <CardContent className="flex h-[72px] items-center justify-between px-5 pb-0 text-xl">
          <div>{children}</div>
          <div className="size-14">
            <Icon />
          </div>
        </CardContent>
        <CardFooter className="h-10 px-5 pb-5 text-sm">{unit}</CardFooter>
      </Card>
    </Link>
  );
};

export default SensorStatusCard;
