import { seedComponents, seedHistory } from "@/lib/seed";
import { NextPage } from "next";

const Page: NextPage = async () => {
  if (process.env.NODE_ENV === "development") {
    await seedComponents();
    await seedHistory();
  }

  return <h1>Hello World</h1>;
};

export default Page;
