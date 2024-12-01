import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Row } from "@tanstack/react-table";
import { mkConfig, generateCsv, download } from "export-to-csv";
import type { RepairHistory } from "@/lib/schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// TODO: use this more
export function formatName(sentence: string) {
  return sentence
    .replace(/-/g, " ")
    .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
}

// Configuration for CSV export
const csvConfig = mkConfig({
  fieldSeparator: ",",
  filename: "history",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

// Export function with improved readability
export function exportExcel(rows: Row<RepairHistory>[]) {
  const rowData = rows.map((row) => ({
    Date: row.original.date as string,
    "Action Type": row.original["action-type"],
    "Component Name": row.original["component-name"],
    Description: row.original.description,
    "Technical Specification": row.original["technical-specification"]
      ? row.original["technical-specification"]
          .map((item) => {
            const [key] = Object.keys(item);
            const value = item[key];
            const formattedKey = key
              .replace(/-/g, " ")
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
              )
              .join(" ");
            const formattedValue =
              value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
            return `${formattedKey}: ${formattedValue}`;
          })
          .join("\n")
      : "-",
    Image: row.original.image || "-",
  }));

  const csv = generateCsv(csvConfig)(rowData);
  download(csvConfig)(csv);
}
