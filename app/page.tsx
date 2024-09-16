import { Lato } from "next/font/google";

import { cn } from "@/lib/utils"

import { UserIcon, KeyIcon } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";

import GlowingBackdrop from "@/components/Common/GlowingBackdrop";

const lato = Lato({ weight: ["100", "300", "400", "700", "900"], subsets: ["latin"] });
// const inter = Inter({ subsets: ["latin"] });

export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image.";

export default function Page() {
  return (
    <div className={cn("min-h-screen bg-red-200 h-full flex items-center justify-center", lato.className)}>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 bg-black">
        <GlowingBackdrop />
        <div className="hidden lg:block"></div>

        <div className="flex items-center justify-center py-12">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";

function LoginForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center py-12 gap-8">
        <CardTitle className="text-6xl text-secondary-foreground">
          Login
        </CardTitle>
        <CardDescription className="flex flex-col text-base font-semibold text-secondary-foreground">
          <span className="leading-4">Selamat Datang</span>
          <span className="leading-4">Silahkan Masukkan kredensial anda</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
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
      <CardFooter className="pb-12">
        <Button variant="secondary" className="w-full uppercase text-xl font-extrabold p-2">Login</Button>
      </CardFooter>
    </Card>
  );
}
