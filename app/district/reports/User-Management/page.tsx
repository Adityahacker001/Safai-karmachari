"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectToAdminUserManagement() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/district/administration/user-management");
  }, [router]);
  return null;
}