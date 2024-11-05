"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { History } from "@/types";

export const columns: ColumnDef<History>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "action_type",
    header: "Action Type",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "technical_specification",
    header: "Technical Specification (Replacement)",
  },
  {
    accessorKey: "image",
    header: "Image",
  },
];
