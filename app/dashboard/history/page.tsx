import type { FC } from "react";

import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { columns } from "@/components/HistoryTable/Columns";
import HistoryTable from "@/components/HistoryTable/HistoryTable";

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

      return {
        date: formattedDate,
        "action-type": parsed.data["action-type"],
        "component-name": parsed.data["component-name"],
        description: parsed.data["description"],
        image: parsed.data["image"],
        "technical-specification": parsed.data["technical-specification"],
      };
    }

    // TODO: better error handling
    console.log(parsed.error.format());
  });

  // TODO: this type is very wrong
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
      </Card>
    </main>
  );
};

export default HistoryPage;
