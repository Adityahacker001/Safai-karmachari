"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function PageRedirect() {
  const router = useRouter();
  React.useEffect(() => {
    router.replace("/contractor/administration/audit-logs");
  }, [router]);

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold">Redirecting to Administration → Audit Logs…</h2>
      <p className="text-sm text-slate-600 mt-2">If you are not redirected automatically, <a className="text-blue-600 underline" href="/contractor/administration/audit-logs">click here</a>.</p>
    </div>
  );
}