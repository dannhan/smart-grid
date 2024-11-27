"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { RepairHistory } from "@/lib/schema";

export const columns: ColumnDef<RepairHistory>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "component-name",
    header: "Component",
  },
  {
    accessorKey: "action-type",
    header: "Action Type",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "technical-specification",
    header: "Technical Specification (Replacement)",
    cell: ({ row }) => {
      const properties: Record<string, string> | undefined = row.getValue(
        "technical-specification",
      );

      return properties ? (
        <ul>
          {Object.entries(properties).map(([key, value]) => (
            <li key={key} className="capitalize leading-4">
              {key.replace("-", " ")}: {value.replace("-", " ")}
            </li>
          ))}
        </ul>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "image",
    header: "Image",
  },
];
