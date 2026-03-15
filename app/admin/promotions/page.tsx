import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { togglePromotion } from "@/app/actions/toggle-promotion";

export default async function PromotionsPage() {
  const promotions = await prisma.promotion.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Promotions</h1>

        <Link
          href="/admin/promotions/new"
          className="bg-black text-white px-4 py-2 rounded"
        >
          New Promotion
        </Link>
      </div>

      <div className="mt-6 space-y-4">
        {promotions.map((promo) => {
          const toggle = togglePromotion.bind(null, promo.id, promo.active);

          return (
            <div key={promo.id} className="border rounded p-4">
              <h2 className="font-semibold">{promo.title}</h2>
              <p>{promo.message}</p>

              <p className="text-sm text-gray-500 mt-2">
                {promo.active ? "Active" : "Inactive"}
              </p>

              <form action={toggle} className="mt-3">
                <button className="px-3 py-1 rounded bg-gray-800 text-white">
                  {promo.active ? "Deactivate" : "Activate"}
                </button>
              </form>
            </div>
          );
        })}

        {promotions.length === 0 && (
          <p className="text-gray-500 mt-4">No promotions created yet.</p>
        )}
      </div>
    </main>
  );
}
