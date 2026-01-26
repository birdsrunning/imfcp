import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import PlanBoard from "../PlanBoard";

export default async function PlanBoardHome() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    return <PlanBoard plan={session.paymentStatus} />;
  } else {
    return <PlanBoard plan={undefined} />;
  }
}
