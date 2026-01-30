import { z } from "zod";

export const UploadFormSchema = z.object({
  title: z.string().min(1, "Title is required"),

  description: z.string().default(""), // default empty string for testing

  accessTier: z.enum(["free", "premium"]).default("premium"),

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
      "Only image files are allowed",
    )
    .refine((file) => file.size <= 20 * 1024 * 1024, "Max file size is 20MB"),
});

export type UploadFormType = z.infer<typeof UploadFormSchema>;

// Enums
export const ACCESS_TIER = ["free", "premium"];

const imageFileSchema = z
  .instanceof(File, { message: "File is required" })
  .refine((file) => file.size > 0, "File cannot be empty")
  .refine(
    (file) => file.type.startsWith("image/"),
    "Only image files are allowed",
  )
  .refine((file) => file.size <= 20 * 1024 * 1024, "Max file size is 20MB");

// sharp upload

export const sharpUploadSchema = z.object({
  images: z
    .array(imageFileSchema)
    .min(1, "At least one image is required")
    .max(10, "You can upload up to 10 images"),
});

export type sharpUploadType = z.infer<typeof sharpUploadSchema>;


export const EditFormSchema = z.object({
  title: z.string().min(1, "Title is required"),

  description: z.string(),

  accessTier: z.enum(["free", "premium"]),

  categories: z.object({
    abstract: z.boolean(),
    fashion: z.boolean(),
    food: z.boolean(),
    travel: z.boolean(),
  }),

  // optional when editing
  image: z.instanceof(File).optional(),
});

export type EditFormType = z.infer<typeof EditFormSchema>;

export const SpecialQuestionSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export type SpecialQuestionType = z.infer<typeof SpecialQuestionSchema>;



// export const ImageBaseFields = {
//   title: z.string().min(1, "Title is required"),

//   description: z.string().default(""),

//   accessTier: z.enum(["free", "premium"]),

//   categories: z.object({
//     abstract: z.boolean(),
//     fashion: z.boolean(),
//     food: z.boolean(),
//     travel: z.boolean(),
//   }),
// };

// export const EditFormSchema = z.object({
//   ...ImageBaseFields,

//   // optional on edit
//   image: z.instanceof(File).optional(),
// });

// export type EditFormType = z.infer<typeof EditFormSchema>;

