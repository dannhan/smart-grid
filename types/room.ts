import type { DocumentReference, Timestamp } from "firebase/firestore";

// type for realtime database room
export type ControlledRoom = {
  name: string;
  lamp: number;
  socket: number;
};

// type for firestore room
export type Room = {
  name: string;
  date_created: Timestamp;
  componentRefs: DocumentReference[];
};
