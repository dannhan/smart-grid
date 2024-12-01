"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  doc,
  addDoc,
  updateDoc,
  collection,
  Timestamp,
} from "firebase/firestore";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { LoaderCircleIcon } from "lucide-react";

import { Button } from "@/components/shadcn/button";
import { Form } from "@/components/shadcn/form";
import ImageForm from "./FormElement/ImageForm";
import InputForm from "./FormElement/InputForm";
import TextareaForm from "./FormElement/TextareaForm";
import DatePickerForm from "./FormElement/DatePickerForm";

import { revalidateHistory } from "@/actions/revalidateHistory";

import { type RepairHistory, repairHistorySchema } from "@/lib/schema";
import { formatName } from "@/lib/utils";
import { firestore } from "@/lib/firebase/database";
import { uploadFiles } from "@/lib/uploadthing";

// TODO: allow only image to be uploaded!
const formSchema = z.object({
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => file instanceof File, {
      message: "Please upload a valid image file.",
    }),
  brand: z.string().min(1),
  voltage: z.string().min(1),
  "max-current": z.string().min(1),
  warranty: z.coerce.date(),
  // TODO: is optional a better way?
  description: z.string().min(0),
});

interface Props {
  componentId: string;
}

// TODO:
// handle file upload
// fetch data for default value
const SocketChangeForm: React.FC<Props> = ({ componentId }) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  // TODO: set the default
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand: "",
      voltage: "",
      "max-current": "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const uploadedFiles = await uploadFiles("image", {
        files: [values.image],
      });

      const data: RepairHistory = {
        "action-type": "Replacement",
        "component-ref": doc(firestore, "components", componentId),
        "component-name": formatName(componentId),
        date: Timestamp.now(),
        image: uploadedFiles[0].url,
        imageKey: uploadedFiles[0].key,
        "technical-specification": [],
        description: values.description,
      };

      const specification: Record<string, string>[] = Object.entries(values)
        .filter(([key]) => key !== "image" && key !== "description")
        .map(([key, value]) => {
          if (key === "warranty")
            return { "warranty-exp.": format(value as Date, "dd MMMM yyyy") };
          if (key === "max-current")
            return { "max.-current": String(value) } as Record<string, string>;

          return { [key]: String(value) };
        });

      data["technical-specification"] = specification;

      repairHistorySchema.parse(data);
      // TODO: what if one of this fail?
      await Promise.all([
        addDoc(collection(firestore, "repair-histories"), data),
        updateDoc(doc(firestore, "components", componentId), {
          properties: specification,
        }),
      ]);
      await revalidateHistory();

      router.push("./");
      toast.success("Form submitted.");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-4"
      >
        <ImageForm form={form} name="image" />
        <InputForm form={form} name="brand" />
        <InputForm form={form} name="voltage" />
        <InputForm form={form} name="max-current" />
        <DatePickerForm form={form} name="warranty" label="Warranty Exp." />
        <TextareaForm form={form} name="description" />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && (
            <div className="h-wit w-fit rounded-full p-0.5">
              <LoaderCircleIcon className="h-4 w-4 animate-spin" />
            </div>
          )}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SocketChangeForm;
