"use client";

import { useEffect, useState } from "react";

export default function PromotionCountdown({
  endDate,
}: {
  endDate: string | Date | null;
}) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!endDate) return;

    const end = new Date(endDate).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = end - now;

      if (distance <= 0) {
        setTimeLeft("Expired");
        clearInterval(timer);
        return;
      }

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0",
        )}:${String(seconds).padStart(2, "0")}`,
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (!endDate) return null;

  return <span> — ENDS IN {timeLeft}</span>;
}
