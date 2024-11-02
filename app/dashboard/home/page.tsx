import type { FC } from "react";
import Link from "next/link";

import { ChevronRightIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { ChartComponent } from "@/components/BarChart";

import { dashboardInfoItems } from "@/lib/config";

const DashboardPage: FC = () => {
  return (
    <main className="flex flex-1 flex-col gap-8 px-4 py-8">
      <div className="gap grid w-full grid-cols-2 grid-rows-2 gap-x-12 gap-y-6">
        {/* TODO: href */}
        {dashboardInfoItems.map((item) => (
          <Link href={"#"} key={item.title}>
            <Card className="relative font-bold">
              <CardHeader className="px-5 pb-0 pt-4">
                <CardTitle className="text-2xl font-bold">
                  {item.title}
                </CardTitle>
                <ChevronRightIcon
                  className="absolute right-4 top-3 size-5"
                  strokeWidth={2.5}
                />
              </CardHeader>
              <CardContent className="flex items-center justify-between px-5 pb-0 text-xl">
                <div>{item.value}</div>
                <div className="size-14">
                  <item.icon />
                </div>
              </CardContent>
              <CardFooter className="px-5 pb-5 text-sm">{item.unit}</CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      <ChartComponent />
    </main>
  );
};

export default DashboardPage;
