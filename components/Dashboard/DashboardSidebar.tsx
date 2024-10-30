import { FC } from "react";

import { Button } from "@/components//shadcn/button";
import { sidebarItems } from "@/lib/config";

const DashboardSidebar: FC = () => {
  return (
    <aside className="hidden h-full w-64 md:block">
      <nav>
        <ul>
          {sidebarItems.map((item) => (
            <li key={item.title}>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="w-full justify-start rounded-lg rounded-l-none text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <a href={item.url}>
                  <item.icon className="size-4 shrink-0" />
                  <span className="truncate">{item.title}</span>
                </a>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
