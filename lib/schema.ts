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
  "component-ref": DocumentReferenceType,
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
  "technical-specification": z.array(z.record(z.string(), z.string())),
});

// TODO: handle other action type
export const repairHistorySchema = z.discriminatedUnion("action-type", [
  repairSchema,
  nonRepairSchema,
]);

// TODO: might change image to be an object that contain the properties of the image
export type RepairHistory = z.infer<typeof repairHistorySchema> & {
  imageKey?: string;
};

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(50),
  password: z.string().min(5).max(128),
  image: z
    .object({
      imageUrl: z.string(),
      imageKey: z.string(),
    })
    .optional(),
  role: z.enum(["user", "admin"]), // Example role for scalability
});
