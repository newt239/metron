"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { cn } from "@/lib/utils";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const token = window.location.href.split(/\=|\&/)[1];
    if (token) {
      window.document.cookie = `spotify_token=${token}`;
      router.push("/app");
    }
  }, []);

  return (
    <div
      className={cn(
        "h-[calc(100vh-4rem)]",
        "flex",
        "justify-center",
        "items-center"
      )}
    >
      <div className={cn("text-xl")}>Loading...</div>
    </div>
  );
}
