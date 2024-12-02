import { doc, setDoc, Timestamp } from "firebase/firestore";
import { firestore } from "@/lib/firebase/database";

export default async function seedRooms() {
  const rooms = ["a", "b", "c", "d"];
  const now = Timestamp.now(); // Current timestamp

  await Promise.all([
    ...rooms.map((room) => {
      return setDoc(doc(firestore, "rooms", `room-${room}`), {
        name: room.toUpperCase(),
        componentsRef: [
          doc(firestore, "components", `lamp-${room}`),
          doc(firestore, "components", `socket-${room}`),
        ],
        "date-created": now,
      });
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