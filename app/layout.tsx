import type { FC, PropsWithChildren } from "react";
import type { Metadata } from "next";

import "./globals.css";
import { lato } from "./fonts";

import BaseLayout from "@/layouts/Base";
import TailwindIndicator from "@/components/TailwindIndicator";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout: FC<PropsWithChildren> = async ({ children }) => (
  <html lang="en">
    <body className={`${lato.className} antialiased`}>
      <BaseLayout>{children}</BaseLayout>
      <TailwindIndicator />
    </body>
  </html>
);

export default RootLayout;
