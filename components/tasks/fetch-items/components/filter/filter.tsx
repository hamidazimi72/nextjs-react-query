"use client";

import { Dispatch, SetStateAction, useState } from "react";

import { useGetTasks } from "@/hooks/task";

type FormType = { title: string; selectedStatus: string };

type FilterTypeProps = { form: FormType; setForm: Dispatch<SetStateAction<FormType>>; page: number; perPage: number };

export const Filter: React.FC<FilterTypeProps> = ({ form, setForm, page, perPage }) => {
  const [initForm, setInitForm] = useState<FormType>({ title: "", selectedStatus: "" });

  const submitHandler = (e: any) => {
    e.preventDefault();
  };

  const { refetch } = useGetTasks(
    { page, perPage, title: form?.title, status: form?.selectedStatus },
    { queryKey: ["tasks", page, perPage, form?.title, form?.selectedStatus], enabled: false },
  );

  const searchHandler = () => {
    setForm((PS) => ({ ...PS, title: initForm?.title, selectedStatus: initForm?.selectedStatus }));
    refetch();
  };

  return (
    <form onSubmit={(e) => submitHandler(e)} className="grid grid-cols-4 gap-2 justify-between items-center mb-4">
      <input
        className="col-span-1 p-2 rounded border border-neutral-300 outline-0"
        placeholder="عنوان تسک"
        value={initForm?.title}
        onChange={(e) => setInitForm((PS) => ({ ...PS, title: e?.target?.value }))}
      />
      <select
        className="col-span-1 p-2 rounded border border-neutral-300 outline-0"
        onChange={(e) => setInitForm((PS) => ({ ...PS, selectedStatus: e?.target?.value }))}
      >
        <option value="">همه موارد</option>
        <option value="true">تکمیل شده</option>
        <option value="false">تکمیل نشده</option>
      </select>

      <span className="col-span-1" />

      <button className="p-2 rounded bg-neutral-200 cursor-pointer" onClick={searchHandler}>
        جستجو
      </button>
    </form>
  );
};
