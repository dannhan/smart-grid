import { z } from "zod";
import { DocumentReference, Timestamp } from "firebase/firestore";

const TimestampType = z.custom<Timestamp>(
  (value) => value instanceof Timestamp,
);

const DocumentReferenceType = z.custom<DocumentReference>(
  (value) => value instanceof DocumentReference,
);

export const baseHistorySchema = z.object({
  // component-ref might not be used
  "component-ref": DocumentReferenceType.or(z.undefined()),
  "component-name": z.string(),
  date: z.string().or(TimestampType),
  description: z.string(),
  image: z.string(),
});

const repairSchema = baseHistorySchema.extend({
  "action-type": z.literal("Repair"),
  "technical-specification": z.undefined(), // Must be undefined
});

const nonRepairSchema = baseHistorySchema.extend({
  "action-type": z.literal("Replacement"),
  "technical-specification": z.record(z.string(), z.string()),
});

// TODO: handle other action type
export const repairHistorySchema = z.discriminatedUnion("action-type", [
  repairSchema,
  nonRepairSchema,
]);

export type RepairHistory = z.infer<typeof repairHistorySchema>;
