import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import { LogOutIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/avatar";
import Header from "@/components/Common/Header";
import DashboardHeaderClock from "@/components/Dashboard/DashboardHeaderClock";

// TODO: active link, font
const DashboardHeader: FC = () => {
  return (
    <div className="hidden rounded-b-2xl bg-card shadow md:block">
      <Header className="mx-auto w-full max-w-screen-xl bg-transparent shadow-none md:flex">
        <div className="flex items-center gap-8">
          <Image
            alt="Smart Grid Logo"
            src="/logo.png"
            height={450}
            width={105}
          />
          <DashboardHeaderClock />
        </div>
        <div className="flex items-center gap-4">
          <p>Halo, Fais H</p>
          <Avatar className="size-8">
            <AvatarImage src="/avatar.jpg" />
            <AvatarFallback className="bg-muted"></AvatarFallback>
          </Avatar>
          <Link href="/login">
            <LogOutIcon strokeWidth={3.4} />
          </Link>
        </div>
      </Header>
    </div>
  );
};

export default DashboardHeader;
