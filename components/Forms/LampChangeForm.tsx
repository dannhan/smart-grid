"use client";

import * as React from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { CloudUploadIcon, PaperclipIcon, CalendarIcon } from "lucide-react";

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

const formSchema = z.object({
  brand: z.string(),
  voltage: z.string(),
  power: z.string(),
  lumens: z.string(),
  "warranty-exp.": z.coerce.date(),
  image: z.string().optional(),
  description: z.string().optional(),
});

interface Props {
  componentId: string;
}

// TODO:
// handle file upload
// fetch data for default value
const LampChangeForm: React.FC<Props> = ({ componentId }) => {
  const [files, setFiles] = React.useState<File[] | null>(null);

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
      power: "",
      lumens: "",
      "warranty-exp.": new Date(),
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>,
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
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
                  value={files}
                  onValueChange={setFiles}
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
                    {files &&
                      files.length > 0 &&
                      files.map((file, i) => (
                        <FileUploaderItem key={i} index={i}>
                          <PaperclipIcon className="h-4 w-4 stroke-current" />
                          <span>{file.name}</span>
                        </FileUploaderItem>
                      ))}
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
              <FormMessage />
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="power"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[90px,1fr] items-center gap-4 space-y-0">
              <FormLabel>Power</FormLabel>
              <FormControl>
                <div className="flex w-full items-center gap-2">
                  <span>:</span>
                  <Input {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lumens"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[90px,1fr] items-center gap-4 space-y-0">
              <FormLabel>Lumens</FormLabel>
              <FormControl>
                <div className="flex w-full items-center gap-2">
                  <span>:</span>
                  <Input {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="warranty-exp."
          render={({ field }) => (
            <FormItem className="grid grid-cols-[90px,1fr] items-center gap-4 space-y-0">
              <FormLabel>Warranty Exp.</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <div className="flex w-full items-center gap-2">
                      <span>:</span>
                      <Button
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

              <FormMessage />
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
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default LampChangeForm;
