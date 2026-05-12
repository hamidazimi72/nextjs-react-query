"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useLogin } from "@/hooks/auth";

export const LoginForm = () => {
  const [form, formDispatch] = useState<{ cellphone: string; password: string }>({ cellphone: "", password: "" });

  const router = useRouter();

  const onSuccessLoginHandler = () => {
    router.push("/dashboard/tasks");
  };

  const { mutate } = useLogin(onSuccessLoginHandler);

  const loginHandler = async (e: any) => {
    e.preventDefault();

    mutate({ ...form });
  };

  return (
    <form onSubmit={(e) => loginHandler(e)} className="flex flex-col gap-4 w-xs">
      <input
        className="border border-neutral-300 rounded p-2 outline-0 w-full"
        placeholder="شماره موبایل"
        value={form?.cellphone}
        onChange={(e) => formDispatch((PS) => ({ ...PS, cellphone: e?.target?.value }))}
        inputMode="numeric"
        maxLength={11}
      />
      <input
        className="border border-neutral-300 rounded p-2 outline-0 w-full"
        placeholder="رمز عبور"
        value={form?.password}
        onChange={(e) => formDispatch((PS) => ({ ...PS, password: e?.target?.value }))}
      />
      <input className="bg-neutral-300 rounded p-2 w-full" type="submit" value="Login" />
    </form>
  );
};
