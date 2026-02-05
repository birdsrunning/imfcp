import { getNewsletterSubscriberCount } from "@/lib/actions/subscribers";

export default async function NewsletterAdminPage() {
  const { total } = await getNewsletterSubscriberCount();

  return (
    <section className="p-6">
      <h1 className="text-xl font-semibold mb-4">Newsletter</h1>

      <div className="rounded-xl border p-6 bg-background">
        <p className="text-sm opacity-70">Total Subscribers</p>

        <p className="text-4xl font-bold mt-2">{total.toLocaleString()}</p>
      </div>
    </section>
  );
}
