import {
  addDoc,
  doc,
  collection,
  setDoc,
  Timestamp,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "@/lib/firebase/database";
import { RepairHistory } from "@/lib/schema";

export async function seedLamps() {
  const obj = {
    type: "lamp",
    properties: [
      { brand: "Broco" },
      { voltage: "220 volt" },
      { power: "15 watt" },
      { lumens: "1400" },
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
      { voltage: "220 volt" },
      { "max.-current": "16 ampere" },
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
    setDoc(doc(firestore, "rooms", "room-a"), {
      name: "A",
      componentsRef: [
        doc(firestore, "components", "lamp-a"),
        doc(firestore, "components", "socket-a"),
      ],
      "date-created": now,
    }),
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

export async function seedHistory() {
  const repairHistoriesCollection = collection(firestore, "repair-histories");
  const snapshot = await getDocs(repairHistoriesCollection);
  const deletePromises = snapshot.docs.map((docSnapshot) =>
    deleteDoc(docSnapshot.ref),
  );

  await Promise.all(deletePromises); // Ensure all deletions are complete before proceeding
  await addDoc(repairHistoriesCollection, {
    // Month is 0 index
    date: Timestamp.fromDate(new Date(2024, 3, 12)),
    "component-name": "Lamp A",
    "component-ref": doc(firestore, "components", "lamp-a"),
    "action-type": "Repair",
    description: "Replaced broken light",
    image: "-",
  } satisfies RepairHistory);
  await addDoc(repairHistoriesCollection, {
    date: Timestamp.fromDate(new Date(2024, 4, 15)),
    "component-name": "Lamp A",
    "component-ref": doc(firestore, "components", "lamp-b"),
    "action-type": "Replacement",
    description: "Replaced broken light",
    "technical-specification": [
      { brand: "Broco" },
      { power: "15 watt" },
      { lumens: "1400" },
      { voltage: "220 volt" },
      // TODO: warranty
      { "warranty-exp.": "12 Apr 2025" },
    ],
    image: "-",
  } satisfies RepairHistory);
}
