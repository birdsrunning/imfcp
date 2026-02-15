"use client";
import { useState } from "react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ACCESS_TIER, UploadFormSchema, UploadFormType } from "@/schema/schema";
import { Button } from "@/components/ui/button";
// import { uploadHandler } from "@/lib/actions/upload-handler";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader } from "@/components/Loader";
import { CATEGORIES } from "@/data/data";
import { processAndUploadImage } from "@/lib/client-helper/precess-and-upload";

export default function UploadClient() {
  const [loading, setLoading] = useState(false);
  // create the form hook
  const form = useForm({
    resolver: zodResolver(UploadFormSchema),
    defaultValues: {
      title: "",
      description: "",
      accessTier: "premium",
      categories: {
        abstract: false,
        travel: false,
        food: false,
        fashion: false,
      },
    },
  });

  async function onSubmit(data: UploadFormType) {
    try {
      setLoading(true);

      // STEP 1: upload files directly to R2
      const { originalKey, webpKey } = await processAndUploadImage(
        data.image,
      );

      // STEP 2: send only metadata to backend
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          accessTier: data.accessTier,
          categories: data.categories,
          originalKey,
          webpKey,
        }),
      });

      const result = await res.json();

      if (result.success) {
        toast.success(result.message);
        form.reset();
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container px-4 mx-auto my-6 max-w-3xl">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  className="bg-[#2e2a2b] border border-[#3a3536] rounded-md px-3 py-4"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Description */}
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <FieldDescription>
                    Be as detailed as possible
                  </FieldDescription>
                </FieldContent>
                <Textarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  className="bg-[#2e2a2b] border border-[#3a3536] rounded-md px-3 py-4 field-sizing-content"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* access tier */}
          <Controller
            name="accessTier"
            control={form.control}
            render={({ field: { onChange, onBlur, ...field }, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Access Tier</FieldLabel>
                <Select {...field} onValueChange={onChange}>
                  <SelectTrigger
                    id={field.name}
                    onBlur={onBlur}
                    className="w-[180px] bg-[#2e2a2b] border border-[#3a3536] rounded-md"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ACCESS_TIER.map((accessTier) => (
                      <SelectItem key={accessTier} value={accessTier}>
                        {accessTier}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* image */}
          <Controller
            name="image"
            control={form.control}
            render={({
              field: { onChange, onBlur, ref, value },
              fieldState,
            }) => {
              const previewUrl =
                value instanceof File ? URL.createObjectURL(value) : null;

              return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="image">Project Image</FieldLabel>

                  <div className="flex items-center gap-4">
                    {/* Upload button */}
                    <label
                      htmlFor="image"
                      className="inline-flex cursor-pointer items-center rounded-md border border-[#3a3536] bg-[#2e2a2b] px-4 py-2 text-sm text-white hover:border-white/40"
                    >
                      Choose image
                    </label>

                    {/* Filename */}
                    <span className="text-sm text-white/60">
                      {value?.name ?? "No file selected"}
                    </span>

                    {/* Hidden input */}
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={ref}
                      onBlur={onBlur}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        onChange(file);
                      }}
                    />
                  </div>

                  {/* Image preview */}
                  {previewUrl && (
                    <div className="mt-4">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-40 rounded-md border border-[#3a3536] object-cover"
                        onLoad={() => URL.revokeObjectURL(previewUrl)}
                      />
                    </div>
                  )}

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />

          <FieldSet>
            <FieldContent>
              <FieldLegend>Categories</FieldLegend>
              <FieldDescription>
                Select Categories for this image.
              </FieldDescription>
            </FieldContent>

            <FieldGroup data-slot="checkbox-group">
              {CATEGORIES.map((category) => (
                <Controller
                  key={category}
                  name={`categories.${category}`}
                  control={form.control}
                  render={({
                    field: { value, onChange, ...field },
                    fieldState,
                  }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      orientation={"horizontal"}
                    >
                      <Checkbox
                        {...field}
                        id={field.name}
                        checked={value}
                        onCheckedChange={onChange}
                        aria-invalid={fieldState.invalid}
                      />

                      <FieldContent>
                        <FieldLabel htmlFor={field.name}>{category}</FieldLabel>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                    </Field>
                  )}
                />
              ))}
            </FieldGroup>
          </FieldSet>

          <Button disabled={loading} type="submit">
            Upload
            {loading && <Loader />}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}

{
  /* <Controller
                name="categories.abstract"
                control={form.control}
                render={({
                  field: { value, onChange, ...field },
                  fieldState,
                }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    orientation={"horizontal"}
                  >
                    <Checkbox
                      {...field}
                      id={field.name}
                      checked={value}
                      onCheckedChange={onChange}
                      aria-invalid={fieldState.invalid}
                    />

                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>Abstract</FieldLabel>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
              <Controller
                name="categories.fashion"
                control={form.control}
                render={({
                  field: { value, onChange, ...field },
                  fieldState,
                }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    orientation={"horizontal"}
                  >
                    <Checkbox
                      {...field}
                      id={field.name}
                      checked={value}
                      onCheckedChange={onChange}
                      aria-invalid={fieldState.invalid}
                    />

                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>Fashion</FieldLabel>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
              <Controller
                name="categories.food"
                control={form.control}
                render={({
                  field: { value, onChange, ...field },
                  fieldState,
                }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    orientation={"horizontal"}
                  >
                    <Checkbox
                      {...field}
                      id={field.name}
                      checked={value}
                      onCheckedChange={onChange}
                      aria-invalid={fieldState.invalid}
                    />

                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>Food</FieldLabel>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
              <Controller
                name="categories.travel"
                control={form.control}
                render={({
                  field: { value, onChange, ...field },
                  fieldState,
                }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    orientation={"horizontal"}
                  >
                    <Checkbox
                      {...field}
                      id={field.name}
                      checked={value}
                      onCheckedChange={onChange}
                      aria-invalid={fieldState.invalid}
                    />

                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>Travel</FieldLabel>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              /> */
}
