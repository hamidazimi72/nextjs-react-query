"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const DashboardTemplate: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => {
  const router = useRouter();

  const logoutHandler = () => {
    if (window.confirm("شما در حال خروج از برنامه می‌باشید.")) {
      localStorage.removeItem("userInfo");
      router.push("/login");
    }
  };

  const userInfo = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("userInfo") || "{}") : null;

  useEffect(() => {
    if (!userInfo || !userInfo?.id) router.push("/login");
  }, [userInfo]);

  return (
    <div className="flex flex-col">
      <header className="flex justify-between items-center h-14 sticky top-0 bg-neutral-100 shadow py-2 px-4">
        <h3>مدیریت تسک‌ها</h3>
        <button
          className="px-2 py-1 rounded border border-red-600 text-red-600 w-20 cursor-pointer"
          onClick={logoutHandler}
        >
          خروج
        </button>
      </header>
      <div className="min-h-[calc(100vh-56px)]">{children}</div>
    </div>
  );
};
