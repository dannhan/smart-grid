import type { FC } from "react";

import { ChevronDownIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { Button } from "@/components/shadcn/button";

import { columns } from "@/components/HistoryTable/Columns";
import HistoryTable from "@/components/HistoryTable/HistoryTable";
import Pdf from "@/components/Icon/Pdf";
import Csv from "@/components/Icon/Csv";

import { history } from "@/lib/config";

const HistoryPage: FC = () => {
  return (
    <main className="flex min-h-screen min-w-[540px] flex-1 flex-col gap-8 px-4 py-8">
      <Card className="overflow-hidden border-2 border-primary">
        <CardHeader className="bg-primary p-1 text-center text-primary-foreground">
          <CardTitle>Repairs &amp; Changes History</CardTitle>
        </CardHeader>
        <CardContent className="py-6">
          <HistoryTable columns={columns} data={history} />
        </CardContent>
        <CardFooter>
          {/* TODO: create dedicated component for this? */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="relative w-full font-semibold">
                <span>Print</span>
                <ChevronDownIcon className="absolute right-3" strokeWidth={3} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="rounded-xl border-2 border-primary"
            >
              <DropdownMenuItem className="items-center">
                <Pdf />
                <span>PDF</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="items-center">
                <Csv />
                <span>CSV</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    </main>
  );
};

export default HistoryPage;
