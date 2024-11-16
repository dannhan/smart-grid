import type { FC, PropsWithChildren } from "react";
import type { Metadata } from "next";

import "./globals.css";
import { lato } from "./fonts";

import BaseLayout from "@/layouts/Base";
import TailwindIndicator from "@/components/TailwindIndicator";

export const metadata: Metadata = {
  title: "Smart Grid",
  description: "Control and monitor buildings easy, safe and smart!",
};

const RootLayout: FC<PropsWithChildren> = async ({ children }) => (
  <html lang="en" suppressHydrationWarning>
    <body className={`${lato.className} antialiased`}>
      <BaseLayout>{children}</BaseLayout>
      <TailwindIndicator />
    </body>
  </html>
);

export default RootLayout;
