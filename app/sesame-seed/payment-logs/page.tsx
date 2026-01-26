export const dynamic = "force-dynamic";

import React from "react";
import { getAdminPayments } from "@/lib/actions/get-payments";

type PageProps = {
  searchParams: Promise<{
    page?: string;
    from?: string;
    to?: string;
  }>;
};

export default async function AdminPaymentsPage(props: PageProps) {
  // ✅ unwrap like DashboardPage
  const searchParams = await props.searchParams;

  const page = Math.max(1, Number(searchParams.page) || 1);

  const from = searchParams.from
    ? new Date(searchParams.from)
    : undefined;

  const to = searchParams.to
    ? new Date(searchParams.to)
    : undefined;

  const data = await getAdminPayments({
    page,
    from,
    to,
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold">Payment Logs</h1>

      <div className="rounded-md border border-[#3a3536]">
        <table className="w-full text-sm">
          <thead className="border-b border-[#3a3536]">
            <tr className="text-left">
              <th className="p-3">Reference</th>
              <th className="p-3">User</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {data.items.map((p) => (
              <tr
                key={p.id}
                className="border-b border-[#2e2a2b]"
              >
                <td className="p-3">{p.reference}</td>
                <td className="p-3">{p.userEmail}</td>
                <td className="p-3">
                  ₦{Number(p.amount).toLocaleString()}
                </td>
                <td className="p-3">{p.status}</td>
                <td className="p-3">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex gap-4 text-sm">
        {page > 1 && (
          <a
            href={`?page=${page - 1}`}
            className="underline"
          >
            Previous
          </a>
        )}

        {data.hasNextPage && (
          <a
            href={`?page=${page + 1}`}
            className="underline"
          >
            Next
          </a>
        )}
      </div>

      {/* Revenue */}
      <div className="text-sm text-white/70">
        Total Revenue (SUCCESS): ₦
        {Number(data.totalRevenue ?? 0).toLocaleString()}
      </div>
    </div>
  );
}
