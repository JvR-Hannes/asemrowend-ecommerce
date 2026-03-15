import { createPromotion } from "@/app/actions/create-promotion";

export default function NewPromotionPage() {
  return (
    <main className="p-8 max-w-xl">
      <h1 className="text-2xl font-bold">Create Promotion</h1>

      <form action={createPromotion} className="mt-6 space-y-4">
        <input
          name="title"
          placeholder="Promotion Title"
          className="w-full border p-2"
          required
        />

        <textarea
          name="message"
          placeholder="Promotion Message"
          className="w-full border p-2"
          required
        />

        <div>
          <label className="block text-sm font-semibold">Start Date</label>
          <input
            type="datetime-local"
            name="startDate"
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">End Date</label>
          <input
            type="datetime-local"
            name="endDate"
            className="border p-2 w-full"
          />
        </div>

        <label className="flex items-center gap-2">
          <input type="checkbox" name="active" defaultChecked />
          Active
        </label>

        <button className="bg-black text-white px-4 py-2 rounded">
          Create Promotion
        </button>
      </form>
    </main>
  );
}
