"use client";

import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import { ImageIcon } from "lucide-react";

import type { RepairHistory } from "@/lib/schema";
import { Badge } from "@/components/shadcn/badge";

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
      const properties = row.getValue("technical-specification") as
        | Record<string, string>[]
        | undefined;

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
    cell: ({ row }) => {
      const imageUrl = row.getValue("image") as string | undefined;

      return !!imageUrl && imageUrl.length > 1 ? (
        <Link href={imageUrl} target="_blank">
          <Badge
            className="inline-flex max-w-[100px] items-center gap-1 truncate text-xs font-medium text-primary"
            variant="secondary"
          >
            <div className="w-3">
              <ImageIcon className="size-3" />
            </div>
            <span className="truncate">{imageUrl}</span>
          </Badge>
        </Link>
      ) : (
        "-"
      );
    },
  },
];
