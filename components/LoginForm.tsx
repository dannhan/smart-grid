import type { FC } from "react";

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
    <Card className="w-full sm:min-w-[420px]">
      <CardHeader className="text-center py-12 gap-8">
        <CardTitle className="text-6xl text-secondary-foreground">
          Login
        </CardTitle>
        <CardDescription className="flex flex-col text-base font-semibold text-secondary-foreground">
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
            className="w-full appearance-none bg-background pl-8 shadow-none placeholder:italic"
          />
        </div>
      </CardContent>
      <CardFooter className="sm:px-14 pb-20">
        <Button variant="secondary" className="w-full uppercase text-xl font-bold p-2">Login</Button>
      </CardFooter>
    </Card>
  );
}

export default LoginForm;