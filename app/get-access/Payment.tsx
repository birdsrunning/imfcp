"use client";
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
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
// import { uploadHandler } from "@/lib/actions/upload-handler";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { paymentSchema, type PaymentSchemaType } from "@/schema/schema";
import Paystack from "@paystack/inline-js";
import { z } from "zod";

import React from "react";

export default function Payment() {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
  const form = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      amount: "", // to convert to kobo once the form is set up.
    },
  });

  async function onSubmit(data: z.infer<typeof paymentSchema>) {
    if (!publicKey) {
      toast.error("Paystack error");
      return;
    }

    const paystack = new Paystack();

    paystack.newTransaction({
      key: publicKey,
      email: data.email,
      amount: data.amount * 100, // Paystack expects kobo
      onSuccess: (transaction: string) => {
        console.log("Transaction successful:", transaction);
        toast.success("Payment successful!");
      },
      onCancel: () => {
        console.log("User cancelled");
        toast.error("Transaction Cancelled");
      },
    });
  }

  const email = useWatch({ control: form.control, name: "email" });
  const amount = process.env.NEXT_PUBLIC_AMOUNT_IN_KOBO;

  return (
    <div className="min-h-screen">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="John"
                  className="bg-[#2e2a2b] border border-[#3a3536] rounded-md px-3 py-4"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Doe"
                  className="bg-[#2e2a2b] border border-[#3a3536] rounded-md px-3 py-4"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  aria-invalid={fieldState.invalid}
                  {...field}
                  id={field.name}
                  type="email"
                  placeholder="youremail@gmail.com"
                  className="bg-[#2e2a2b] border border-[#3a3536] rounded-md px-3 py-4"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {email && amount !== undefined && (
            <Button type="submit" disabled={!email || Number(amount) <= 0}>
              Pay
            </Button>
          )}
        </FieldGroup>
      </form>
    </div>
  );
}
