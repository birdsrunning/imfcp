// export const dynamic = "force-dynamic";

// import React from "react";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";
// import { redirect } from "next/navigation";
// import { getAdminUsers } from "@/lib/actions/get-users";

// type PageProps = {
//   searchParams: Promise<{
//     page?: string;
//     q?: string;
//     from?: string;
//     to?: string;
//   }>;
// };

// export default async function AdminUserLogsPage(props: PageProps) {
//   const searchParams = await props.searchParams;

//   const page = Math.max(1, Number(searchParams.page) || 1);
//   const q = searchParams.q?.trim() || undefined;

//   const from = searchParams.from
//     ? new Date(searchParams.from)
//     : undefined;

//   const to = searchParams.to
//     ? new Date(searchParams.to)
//     : undefined;

//   // 🔐 Admin guard
//   const session = await auth.api.getSession({ headers: await headers() });
//   if (!session || session.role !== "admin") {
//     redirect("/auth");
//   }

//   const data = await getAdminUsers({
//     page,
//     q,
//     from,
//     to,
//   });

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-xl font-semibold">User Logs</h1>

//       <div className="rounded-md border border-[#3a3536]">
//         <table className="w-full text-sm">
//           <thead className="border-b border-[#3a3536]">
//             <tr className="text-left">
//               <th className="p-3">Email</th>
//               <th className="p-3">Name</th>
//               <th className="p-3">Role</th>
//               <th className="p-3">Payment</th>
//               <th className="p-3">Joined</th>
//             </tr>
//           {/* </thead> */}

//           <tbody>
//             {data.items.map((u) => (
//               <tr
//                 key={u.id}
//                 className="border-b border-[#2e2a2b]"
//               >
//                 <td className="p-3">{u.email}</td>
//                 <td className="p-3">{u.name ?? "—"}</td>
//                 <td className="p-3 capitalize">{u.role}</td>
//                 <td className="p-3 capitalize">
//                   {u.paymentStatus}
//                 </td>
//                 <td className="p-3">
//                   {new Date(u.createdAt).toLocaleDateString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex gap-4 text-sm">
//         {page > 1 && (
//           <a
//             href={`?page=${page - 1}`}
//             className="underline"
//           >
//             Previous
//           </a>
//         )}

//         {data.hasNextPage && (
//           <a
//             href={`?page=${page + 1}`}
//             className="underline"
//           >
//             Next
//           </a>
//         )}
//       </div>

//       {/* Stats */}
//       <div className="text-sm text-white/70">
//         Total Users: {data.total}
//       </div>
//     </div>
//   );
// }
