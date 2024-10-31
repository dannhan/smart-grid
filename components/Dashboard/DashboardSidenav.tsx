"use client";

import { FC } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components//shadcn/button";
import { sidenavItems } from "@/lib/config";

const DashboardSidenav: FC = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <aside className="hidden h-full w-64 md:block">
      <nav>
        <ul className="space-y-1">
          {sidenavItems.map((item) => (
            <li key={item.title}>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className={cn(
                  "w-full justify-start rounded-lg rounded-l-none font-semibold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground xl:rounded-l-lg",
                  item.url.endsWith(`${segment}`) &&
                    "bg-primary text-primary-foreground",
                )}
              >
                <Link href={item.url}>
                  <item.icon className="size-4 shrink-0" strokeWidth={2.3} />
                  <span className="truncate">{item.title}</span>
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardSidenav;
