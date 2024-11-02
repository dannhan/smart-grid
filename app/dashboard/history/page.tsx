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
import Pdf from "@/components/Icon/Pdf";
import Csv from "@/components/Icon/Csv";

const HistoryPage: FC = () => {
  return (
    <main className="flex flex-1 flex-col gap-8 px-4 py-8">
      <Card className="overflow-hidden border-2 border-primary">
        <CardHeader className="bg-primary p-1 text-center text-primary-foreground">
          <CardTitle className="text-2xl font-bold">
            Repairs & Changes History
          </CardTitle>
        </CardHeader>
        <CardContent className="h-96"></CardContent>
        <CardFooter>
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
