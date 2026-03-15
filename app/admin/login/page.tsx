"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/admin-login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      window.location.href = "/admin";
    } else {
      alert("Invalid password");
    }
  }

  return (
    <main className="p-8 max-w-sm">
      <h1 className="text-2xl font-bold">Admin Login</h1>

      <form onSubmit={handleLogin} className="mt-6 space-y-4">
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="rounded bg-black px-4 py-2 text-white">
          Login
        </button>
      </form>
    </main>
  );
}
