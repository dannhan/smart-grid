"use client";

import * as React from "react";
import Link from "next/link";

import { BoxIcon, HomeIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  path: string;
}

const MobileNav: React.FC<Props> = ({ path }) => {
  return (
    <section className="h-16 sm:hidden">
      <nav className="fixed bottom-0 left-0 flex w-full bg-primary-gradient">
        <Link
          href="/dashboard/home"
          className={cn(
            "relative z-20 flex h-16 w-1/2 skew-x-[18deg] items-center justify-center rounded-tr-3xl text-white",
            path != "home" && "w-[calc(50%+1px)] bg-primary-gradient",
            path === "home" &&
            "-skew-x-[18deg] rounded-br-3xl bg-background text-black",
          )}
        >
          <HomeIcon
            className={cn(
              "size-6 skew-x-[18deg] transition-none",
              path === "ar" && "-skew-x-[18deg]",
            )}
          />
        </Link>

        <div className="absolute top-0 h-1/2 w-full bg-background" />

        <Link
          href="/dashboard/ar"
          className={cn(
            "relative z-20 flex h-16 w-1/2 -skew-x-[18deg] items-center justify-center rounded-tl-3xl text-white",
            path != "ar" && "w-[calc(50%+2px)] bg-primary-gradient",
            path == "ar" &&
            "-t-none skew-x-[18deg] rounded-bl-3xl bg-background text-black",
          )}
        >
          <BoxIcon
            className={cn(
              "size-6 -skew-x-[18deg] transition-none",
              path === "home" && "skew-x-[18deg]",
            )}
          />
        </Link>
      </nav>
    </section>
  );
};

export default MobileNav;
