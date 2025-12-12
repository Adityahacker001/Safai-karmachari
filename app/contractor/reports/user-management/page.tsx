"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function PageRedirect() {
  const router = useRouter();
  React.useEffect(() => {
    // Replace old route with new administration path
    router.replace("/contractor/administration/user-management");
  }, [router]);

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold">Redirecting to Administration → User Management…</h2>
      <p className="text-sm text-slate-600 mt-2">If you are not redirected automatically, <a className="text-blue-600 underline" href="/contractor/administration/user-management">click here</a>.</p>
    </div>
  );
}