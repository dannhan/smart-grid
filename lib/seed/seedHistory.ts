import {
  addDoc,
  doc,
  collection,
  getDocs,
  deleteDoc,
  Timestamp,
  type CollectionReference,
  type DocumentData,
} from "firebase/firestore";
import { UTApi } from "uploadthing/server";

import { firestore } from "@/lib/firebase/database";
import { RepairHistory } from "@/lib/schema";

const utapi = new UTApi();

async function deleteHistories(
  repairHistoriesCollection: CollectionReference<DocumentData, DocumentData>,
) {
  const snapshot = await getDocs(repairHistoriesCollection);
  const deletePromises = snapshot.docs.map(async (docSnapshot) => {
    const imageUrl = docSnapshot.data().imageKey as string | undefined;
    if (imageUrl) {
      await utapi.deleteFiles(imageUrl); // Ensure the file deletion is awaited
    }
    await deleteDoc(docSnapshot.ref); // Ensure the document deletion is awaited
  });

  await Promise.all(deletePromises); // Ensure all deletions are complete before proceeding
}

export default async function seedHistory() {
  const repairHistoriesCollection = collection(firestore, "repair-histories");

  await deleteHistories(repairHistoriesCollection);
  await Promise.all([
    addDoc(repairHistoriesCollection, {
      date: Timestamp.fromDate(new Date(2024, 3, 12)), // Month is 0 index
      "component-name": "Lamp A",
      "component-ref": doc(firestore, "components", "lamp-a"),
      "action-type": "Repair",
      description: "Replaced broken light",
      image: "",
    } satisfies RepairHistory),
    addDoc(repairHistoriesCollection, {
      date: Timestamp.fromDate(new Date(2024, 4, 15)), // Month is 0 index
      "component-name": "Lamp A",
      "component-ref": doc(firestore, "components", "lamp-a"),
      "action-type": "Replacement",
      description: "Replaced broken light",
      "technical-specification": [
        { brand: "Broco" },
        { power: "15 watt" },
        { lumens: "1400" },
        { voltage: "220 volt" },
        { "warranty-exp.": "12 Apr 2025" },
      ],
      image: "",
    } satisfies RepairHistory),
  ]);

  console.log("Histories seed completed!");
}
