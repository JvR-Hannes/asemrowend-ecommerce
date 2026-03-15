"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createPromotion(formData: FormData) {
  const title = formData.get("title") as string;
  const message = formData.get("message") as string;
  const active = formData.get("active") === "on";

  const startDateValue = formData.get("startDate") as string;
  const endDateValue = formData.get("endDate") as string;

  const startDate = startDateValue ? new Date(startDateValue) : null;
  const endDate = endDateValue ? new Date(endDateValue) : null;

  await prisma.promotion.create({
    data: {
      title,
      message,
      active,
      startDate,
      endDate,
    },
  });

  redirect("/admin/promotions");
}
