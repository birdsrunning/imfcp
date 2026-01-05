import { z } from "zod";

export const UploadFormSchema = z.object({
  title: z.string().min(1, "Title is required"),

  description: z.string().default(""), // default empty string for testing

  orientation: z.enum(["landscape", "portrait"]).default("landscape"),

  categories: z.object({
    abstract: z.boolean(),
    fashion: z.boolean(),
    food: z.boolean(),
    travel: z.boolean(),
  }),

  image: z
    .instanceof(File, { message: "File is required" })
    .refine((file) => file.size > 0, "File cannot be empty")
    .refine(
      (file) => file.type.startsWith("image/"),
      "Only image files are allowed"
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, "Max file size is 5MB"),
});

export type UploadFormType = z.infer<typeof UploadFormSchema>;
export const IMAGE_ORIENTATION = ["landscape", "portrait"];

export const AdminLogUpload = z.object({
  uploadLog: z.string().default(""), // default empty string for testing
});
export type AdminLogUploadType = z.infer<typeof AdminLogUpload>;

export const paymentSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  amount: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Amount must be a number",
    })
    .transform((val) => Number(val))
    .refine((val) => val > 0, { message: "Amount must be positive" })
    .refine((val) => val >= 100, { message: "Minimum amount is 100" })
    .refine((val) => val <= 1000000, { message: "Maximum amount is 1000000" }),
});
export type PaymentSchemaType = z.infer<typeof paymentSchema>;

const imageFileSchema = z
  .instanceof(File, { message: "File is required" })
  .refine((file) => file.size > 0, "File cannot be empty")
  .refine(
    (file) => file.type.startsWith("image/"),
    "Only image files are allowed"
  )
  .refine((file) => file.size <= 5 * 1024 * 1024, "Max file size is 5MB");

export const sharpUploadSchema = z.object({
  images: z
    .array(imageFileSchema)
    .min(1, "At least one image is required")
    .max(10, "You can upload up to 10 images"),
});

export type sharpUploadType = z.infer<typeof sharpUploadSchema>;
