import type { FC } from "react";
import Link from "next/link";

import { UserIcon, KeyIcon } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";

const LoginForm: FC = () => {
  return (
    <Card className="w-full border-none shadow-none sm:min-w-[420px]">
      <CardHeader className="gap-8 py-12 text-center">
        <CardTitle className="text-6xl">Login</CardTitle>
        <CardDescription className="flex flex-col text-base font-semibold">
          <span className="leading-4">Selamat Datang</span>
          <span className="leading-4">Silahkan Masukkan kredensial anda</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:px-14">
        <div className="relative w-full">
          <Label htmlFor="username" className="sr-only">
            Username
          </Label>
          <UserIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="username"
            placeholder="username"
            className="w-full appearance-none bg-background pl-8 shadow-none placeholder:italic"
          />
        </div>
        <div className="relative w-full">
          <Label htmlFor="password" className="sr-only">
            Password
          </Label>
          <KeyIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            placeholder="password"
            type="password"
            className="w-full appearance-none bg-background pl-8 shadow-none placeholder:italic"
          />
        </div>
      </CardContent>
      <CardFooter className="pb-20 sm:px-14">
        <Button
          variant="outline"
          className="w-full p-2 text-xl font-bold uppercase hover:bg-background/80 hover:text-foreground"
          asChild
        >
          <Link href="/dashboard/home">Login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
