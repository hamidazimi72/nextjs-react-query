"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useRegister } from "@/hooks/auth";

export const RegisterForm = () => {
  const [form, formDispatch] = useState<{
    firstname: string;
    lastname: string;
    cellphone: string;
    password: string;
  }>({ firstname: "", lastname: "", cellphone: "", password: "" });

  const router = useRouter();

  const onSuccessRegisterHandler = () => {
    console.log("ثبت نام با موفقیت انجام شد.");
    router.push("/dashboard/tasks");
  };

  const { userRegister } = useRegister(onSuccessRegisterHandler);

  const registerHandler = async (e: any) => {
    e.preventDefault();

    userRegister({ ...form, cellphone: +form?.cellphone });
  };

  return (
    <form onSubmit={registerHandler} className="flex flex-col gap-4 w-xs">
      <input
        className="border border-neutral-300 rounded p-2 outline-0 w-full"
        placeholder="نام"
        value={form?.firstname}
        onChange={(e) => formDispatch((PS) => ({ ...PS, firstname: e?.target?.value }))}
      />
      <input
        className="border border-neutral-300 rounded p-2 outline-0 w-full"
        placeholder="نام خانوادگی"
        value={form?.lastname}
        onChange={(e) => formDispatch((PS) => ({ ...PS, lastname: e?.target?.value }))}
      />
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
      <input className="bg-neutral-300 rounded p-2 w-full" type="submit" value="ثبت نام" />
    </form>
  );
};
