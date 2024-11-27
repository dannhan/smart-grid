import type { FC } from "react";

import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { format } from "date-fns";
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

import { repairHistorySchema, type RepairHistory } from "@/lib/schema";
import { firestore } from "@/lib/firebase/database";

const HistoryPage: FC = async () => {
  // TODO: this should use admin sdk instead
  const q = query(collection(firestore, "repair-histories"), orderBy("date"));
  const snap = await getDocs(q);

  const promises = snap.docs.map(async (doc) => {
    const parsed = repairHistorySchema.safeParse(doc.data());
    if (!parsed.error) {
      const date = (parsed.data.date as Timestamp).toDate();
      const formattedDate = format(date, "dd MMMM yyyy");

      delete parsed.data["component-ref"];
      return {
        ...parsed.data,
        date: formattedDate,
      };
    }

    // TODO: better error handling
    console.log(parsed.error.format());
  });

  const data = (await Promise.all(promises)) as RepairHistory[];

  return (
    <main className="flex min-h-screen min-w-[580px] flex-1 flex-col gap-8 px-4 py-8">
      <Card className="overflow-hidden border-2 border-primary">
        <CardHeader className="bg-primary p-1 text-center text-primary-foreground">
          <CardTitle>Repairs &amp; Changes History</CardTitle>
        </CardHeader>
        <CardContent className="py-6">
          <HistoryTable columns={columns} data={data} />
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
