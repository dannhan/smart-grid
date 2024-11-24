import { seedComponents } from "@/lib/seed";

export default async function Page() {
  if (process.env.NODE_ENV === "production") return <h1>Hello World</h1>;
  await seedComponents();

  return <h1>Hello World</h1>;
}
