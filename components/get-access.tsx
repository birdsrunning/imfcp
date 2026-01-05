import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function GetAccess({ href }: { href: string }) {
  return (
    <Link href={href}>
      <Button className="rounded-full text-brand-white">Get Access</Button>
    </Link>
  );
}
