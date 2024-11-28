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
      const properties: Record<string, string>[] | undefined = row.getValue(
        "technical-specification",
      );

      return properties ? (
        <ul>
          {properties.map((obj, index) => (
            <li key={index} className="capitalize leading-4">
              {Object.keys(obj)[0].replace("-", " ")}:{" "}
              {Object.values(obj)[0].replace("-", " ")}
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
