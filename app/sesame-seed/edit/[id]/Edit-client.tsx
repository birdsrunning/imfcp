"use client";

import React, { useEffect, useState } from "react";
import { ImageType } from "@/types/types";
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
import { EditFormSchema, EditFormType, ACCESS_TIER } from "@/schema/schema";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/data/data";
import { Loader } from "@/components/Loader";
import { Checkbox } from "@/components/ui/checkbox";
import { editImage } from "@/lib/actions/edit-handler";
import { useRouter } from "next/navigation";

/* ---------- helpers ---------- */
const categoriesArrayToObject = (categories: string[]) => ({
  abstract: categories.includes("abstract"),
  fashion: categories.includes("fashion"),
  food: categories.includes("food"),
  travel: categories.includes("travel"),
});

export default function EditClient({ image }: { image: ImageType }) {
  const [loading, setLoading] = useState(false);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm<EditFormType>({
    resolver: zodResolver(EditFormSchema),
    defaultValues: {
      title: image.title,
      description: image.description ?? "",
      accessTier: image.accessTier,
      categories: categoriesArrayToObject(image.categories),
    },
  });

  const watchedImage = form.watch("image");

  /* ---------- image preview lifecycle ---------- */
  useEffect(() => {
    if (watchedImage instanceof File) {
      const url = URL.createObjectURL(watchedImage);
      setObjectUrl(url);

      return () => URL.revokeObjectURL(url);
    }

    setObjectUrl(null);
  }, [watchedImage]);

  const previewUrl =
    objectUrl ??
    (image.thumbnailUrlKey
      ? `${process.env.NEXT_PUBLIC_THUMBNAIL_CDN}${image.thumbnailUrlKey}`
      : null);

  /* ---------- submit ---------- */
  const onSubmit = async (values: EditFormType) => {
    setLoading(true);

    try {
      const result = await editImage(image.id, values);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
    } catch {
      toast.error("Failed to update image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container px-4 mx-auto my-6 max-w-3xl">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* ---------- TITLE ---------- */}
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
        </FieldGroup>

        {/* ---------- DESCRIPTION ---------- */}
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <FieldDescription>Be as detailed as possible</FieldDescription>
              </FieldContent>
              <Textarea
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                className="bg-[#2e2a2b] border border-[#3a3536] rounded-md px-3 py-4 field-sizing-content"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* ---------- ACCESS TIER ---------- */}
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
                  {ACCESS_TIER.map((tier) => (
                    <SelectItem key={tier} value={tier}>
                      {tier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* ---------- CATEGORIES ---------- */}
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
                    orientation="horizontal"
                  >
                    <Checkbox
                      {...field}
                      checked={value}
                      onCheckedChange={onChange}
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldContent>
                      <FieldLabel>{category}</FieldLabel>
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

        {/* ---------- IMAGE (OPTIONAL) ---------- */}
        <Field>
          <FieldLabel>Replace image (optional)</FieldLabel>
          <FieldContent>
            <Controller
              name="image"
              control={form.control}
              render={({
                field: { onChange, onBlur, ref, value },
                fieldState,
              }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center gap-4">
                    <label
                      htmlFor="image"
                      className="inline-flex cursor-pointer items-center rounded-md border border-[#3a3536] bg-[#2e2a2b] px-4 py-2 text-sm text-white hover:border-white/40"
                    >
                      Choose image
                    </label>

                    <span className="text-sm text-white/60">
                      {value?.name ?? "No file selected"}
                    </span>

                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={ref}
                      onBlur={onBlur}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file || file === value) return;
                        onChange(file);
                      }}
                    />
                  </div>

                  {previewUrl && (
                    <div className="mt-4">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-40 rounded-md border border-[#3a3536] object-cover"
                      />
                    </div>
                  )}

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldContent>
          <FieldDescription>
            Leave empty to keep existing image
          </FieldDescription>
        </Field>

        {/* ---------- SUBMIT ---------- */}
        <div className="flex gap-4">
          <Button
            type="button"
            disabled={loading}
            variant={"outline"}
            onClick={() => {
              router.push("/sesame-seed");
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            Save changes
            {loading && <Loader />}
          </Button>
        </div>
      </form>
    </div>
  );
}
