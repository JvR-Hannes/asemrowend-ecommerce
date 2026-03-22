"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const gaId = process.env.NEXT_PUBLIC_GA_ID;

    if (!gaId) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");

    window.gtag?.("config", gaId, {
      page_path: url,
    });
  }, [pathname, searchParams]);

  return null;
}
