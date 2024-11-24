import { doc, setDoc, Timestamp } from "firebase/firestore";
import { firestore } from "@/lib/firebase/database";

export async function seedLamps() {
  const obj = {
    type: "lamp",
    properties: [
      { brand: "Broco" },
      { power: "15 watt" },
      { lumens: "1400" },
      { voltage: "220 volt" },
      { "warranty-exp.": "12 Apr 2025" },
    ],
  };
  await setDoc(doc(firestore, "components", "lamp-a"), {
    name: "Lamp A",
    ...obj,
  });
  await setDoc(doc(firestore, "components", "lamp-b"), {
    name: "Lamp B",
    ...obj,
  });
  await setDoc(doc(firestore, "components", "lamp-c"), {
    name: "Lamp C",
    ...obj,
  });
  await setDoc(doc(firestore, "components", "lamp-d"), {
    name: "Lamp D",
    ...obj,
  });
}

export async function seedSockets() {
  const obj = {
    type: "socket",
    properties: [
      { brand: "Broco" },
      { "max.-current": "16 ampere" },
      { voltage: "220 volt" },
      { "warranty-exp.": "12 Apr 2025" },
    ],
  };
  await setDoc(doc(firestore, "components", "socket-a"), {
    name: "Socket A",
    ...obj,
  });
  await setDoc(doc(firestore, "components", "socket-b"), {
    name: "Socket B",
    ...obj,
  });
  await setDoc(doc(firestore, "components", "socket-c"), {
    name: "Socket C",
    ...obj,
  });
  await setDoc(doc(firestore, "components", "socket-d"), {
    name: "Socket D",
    ...obj,
  });
}

export async function seedComponents() {
  await seedLamps();
  await seedSockets();
}

export async function seedRooms() {
  const now = Timestamp.now(); // Current timestamp

  await Promise.all([
    setDoc(doc(firestore, "rooms", "room-b"), {
      name: "B",
      componentsRef: [
        doc(firestore, "components", "lamp-b"),
        doc(firestore, "components", "socket-b"),
      ],
      "date-created": now,
    }),
    setDoc(doc(firestore, "rooms", "room-c"), {
      name: "C",
      componentsRef: [
        doc(firestore, "components", "lamp-c"),
        doc(firestore, "components", "socket-c"),
      ],
      "date-created": now,
    }),
    setDoc(doc(firestore, "rooms", "room-d"), {
      name: "D",
      componentsRef: [
        doc(firestore, "components", "lamp-d"),
        doc(firestore, "components", "socket-d"),
      ],
      date_created: now,
    }),
  ]);

  console.log("Rooms seed completed!");
}
