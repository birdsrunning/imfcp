import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Login({ href }: { href: string }) {
  return (
    <Link href={href}>
      <Button className="rounded-2xl bg-brand-orange text-brand-white hover:text-brand-black hover hover:bg-brand-white">
        Login
      </Button>
    </Link>
  );
}
