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
import {
  CloudUploadIcon,
  PaperclipIcon,
  CalendarIcon,
  LoaderCircleIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/shadcn/button";
import { Calendar } from "@/components/shadcn/calendar";
import { Input } from "@/components/shadcn/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/shadcn/file-upload";
import { Textarea } from "@/components/shadcn/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";

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

  const dropZoneConfig = {
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };

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
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FileUploader
                  value={field.value ? [field.value] : []}
                  onValueChange={(files) =>
                    field.onChange(files ? files[0] : [])
                  }
                  dropzoneOptions={dropZoneConfig}
                  className="relative rounded-lg bg-card"
                >
                  <FileInput
                    id="fileInput"
                    className="border-2 bg-muted/40 hover:bg-muted"
                  >
                    <div className="flex w-full flex-col items-center justify-center p-8">
                      <CloudUploadIcon className="h-10 w-10 text-gray-500" />
                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                        &nbsp; or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF
                      </p>
                    </div>
                  </FileInput>
                  <FileUploaderContent>
                    {field.value && (
                      <FileUploaderItem index={0}>
                        <PaperclipIcon className="h-4 w-4 stroke-current" />
                        <span>{field.value.name}</span>
                      </FileUploaderItem>
                    )}
                  </FileUploaderContent>
                </FileUploader>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[90px,1fr] items-center gap-4 space-y-0">
              <FormLabel>Brand</FormLabel>
              <FormControl>
                <div className="flex w-full items-center gap-2">
                  <span>:</span>
                  <Input {...field} />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="voltage"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[90px,1fr] items-center gap-4 space-y-0">
              <FormLabel>Voltage</FormLabel>
              <FormControl>
                <div className="flex w-full items-center gap-2">
                  <span>:</span>
                  <Input {...field} />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="max-current"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[90px,1fr] items-center gap-4 space-y-0">
              <FormLabel>Max. Current</FormLabel>
              <FormControl>
                <div className="flex w-full items-center gap-2">
                  <span>:</span>
                  <Input {...field} />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="warranty"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[90px,1fr] items-center gap-4 space-y-0">
              <FormLabel>Warranty Exp.</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <div className="flex w-full items-center gap-2">
                      <span>:</span>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-full justify-start bg-card pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="h-4 w-4 opacity-50" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </div>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description:</FormLabel>
              <FormControl>
                <Textarea className="min-h-32 border-2" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
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
