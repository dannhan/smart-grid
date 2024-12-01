import {
  addDoc,
  doc,
  collection,
  setDoc,
  getDocs,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { UTApi } from "uploadthing/server";

import { firestore } from "@/lib/firebase/database";
import { RepairHistory } from "@/lib/schema";

const utapi = new UTApi();

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
  await setDoc(doc(firestore, "components", "corridor-lamp"), {
    name: "Corridor Lamp",
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

async function seedWire() {
  const obj = {
    type: "wire",
    properties: [
      { brand: "Suprem" },
      { type: "NYA" },
      { area: "4 mm2" },
      { ampacity: "61 Ampere" },
    ],
  };
  await setDoc(doc(firestore, "components", "wire"), {
    name: "Wire",
    ...obj,
  });
}

async function seedMCB() {
  const obj = {
    type: "mcb",
    properties: [
      { brand: "Schneider" },
      { type: "3p" },
      { protection: "Overload & Short Circuit" },
      { "rated-current": "5 Ampere" },
    ],
  };
  await setDoc(doc(firestore, "components", "mcb"), {
    name: "MCB",
    "rated-current": "20 Ampere",
    type: "mcb",
    properties: [
      { brand: "Schneider" },
      { type: "3p" },
      { protection: "Overload & Short Circuit" },
      { "rated-current": "20 Ampere" },
    ],
  });
  await setDoc(doc(firestore, "components", "mcb-a"), {
    name: "MCB A",
    "rated-current": "5 Ampere",
    ...obj,
  });
  await setDoc(doc(firestore, "components", "mcb-b"), {
    name: "MCB B",
    "rated-current": "5 Ampere",
    ...obj,
  });
  await setDoc(doc(firestore, "components", "mcb-c"), {
    name: "MCB C",
    "rated-current": "5 Ampere",
    ...obj,
  });
  await setDoc(doc(firestore, "components", "mcb-d"), {
    name: "MCB D",
    "rated-current": "5 Ampere",
    ...obj,
  });
}

export async function seedComponents() {
  await seedLamps();
  await seedSockets();
  await seedWire();
  await seedMCB();
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
      "date-created": now,
    }),
    setDoc(doc(firestore, "rooms", "main-panel"), {
      name: "Others",
      componentsRef: [
        doc(firestore, "components", "mcb"),
        doc(firestore, "components", "mcb-a"),
        doc(firestore, "components", "mcb-b"),
        doc(firestore, "components", "mcb-c"),
        doc(firestore, "components", "mcb-d"),
      ],
      "date-created": now,
    }),
    setDoc(doc(firestore, "rooms", "others"), {
      name: "Others",
      componentsRef: [
        doc(firestore, "components", "corridor-lamp"),
        doc(firestore, "components", "wire"),
      ],
      "date-created": now,
    }),
  ]);

  console.log("Rooms seed completed!");
}

export async function seedHistory() {
  const repairHistoriesCollection = collection(firestore, "repair-histories");
  const snapshot = await getDocs(repairHistoriesCollection);
  const deletePromises = snapshot.docs.map(async (docSnapshot) => {
    const imageUrl = docSnapshot.data().imageKey as string | undefined;
    if (imageUrl) {
      await utapi.deleteFiles(imageUrl); // Ensure the file deletion is awaited
    }

    await deleteDoc(docSnapshot.ref); // Ensure the document deletion is awaited
  });

  await Promise.all(deletePromises); // Ensure all deletions are complete before proceeding
  await addDoc(repairHistoriesCollection, {
    // Month is 0 index
    date: Timestamp.fromDate(new Date(2024, 3, 12)),
    "component-name": "Lamp A",
    "component-ref": doc(firestore, "components", "lamp-a"),
    "action-type": "Repair",
    description: "Replaced broken light",
    image: "",
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
      // TODO: warranty, what?
      { "warranty-exp.": "12 Apr 2025" },
    ],
    image: "",
  } satisfies RepairHistory);
}
