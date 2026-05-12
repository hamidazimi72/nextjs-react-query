"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const AuthTemplate: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => {
  const router = useRouter();

  const userInfo = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("userInfo") || "{}") : null;

  useEffect(() => {
    if (userInfo && userInfo?.id) router.push("/dashboard/tasks");
  }, [userInfo]);
  return <div className="min-h-screen flex justify-center items-center">{children}</div>;
};
