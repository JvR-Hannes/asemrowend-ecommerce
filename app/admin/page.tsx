"use client";

import Link from "next/link";

async function logout() {
  await fetch("/api/admin-logout", { method: "POST" });
  window.location.href = "/admin/login";
}

export default function AdminPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <button
        onClick={logout}
        className="rounded bg-red-600 px-3 py-2 mt-4 text-white"
      >
        Logout
      </button>
      <ul className="mt-6 space-y-4">
        <li>
          <Link
            href="/admin/products"
            className="text-blue-600 hover:underline"
          >
            Manage Products
          </Link>
        </li>

        <li>
          <Link href="/admin/orders" className="text-blue-600 hover:underline">
            View Orders
          </Link>
        </li>

        <li>
          <Link
            href="/admin/promotions"
            className="text-blue-600 hover:underline"
          >
            Manage Promotions
          </Link>
        </li>
      </ul>
    </main>
  );
}
