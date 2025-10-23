"use client";

import { useSearchParams } from "next/navigation";

export default function SPCPDashboardPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  const dashboardName = role === "sp" ? "SP Dashboard" : "CP Dashboard";

  return (
    <div>
      <h1>Welcome to the {dashboardName}</h1>
      <p>This is the main page for {dashboardName} operations.</p>
    </div>
  );
}