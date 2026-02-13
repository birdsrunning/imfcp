"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function GetAccess({ href }: { href: string }) {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.push(href);
      }}
      className="rounded-2xl text-brand-white w-fit m-auto p-4"
    >
      Get Access
    </Button>
  );
}
