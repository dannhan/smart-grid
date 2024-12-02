"use server";

import seedComponents from "@/lib/seed/seedComponents";
import seedHistory from "@/lib/seed/seedHistory";
import seedRooms from "@/lib/seed/seedRooms";
import seedUsers from "@/lib/seed/seedUsers";

export async function seedAction() {
  if (process.env.NODE_ENV === "development") {
    await seedComponents();
    await seedHistory();
    await seedRooms();
    await seedUsers();
  }
}
