"use client";

import { useState } from "react";

import { Pagination } from "@/components/attom";
import { useGetTasks } from "@/hooks/task";

import { AddItem, DeleteItem, Filter, ToggleItem, UpdateItem } from "./components";

export const FetchItems = () => {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(3);
  const [filterForm, setFilterForm] = useState<{ title: string; selectedStatus: string }>({
    title: "",
    selectedStatus: "",
  });

  const { data: response } = useGetTasks({
    page,
    perPage,
    title: filterForm?.title,
    status: filterForm?.selectedStatus,
  });

  return (
    <div>
      <div className="flex justify-between items-center gap-4 mb-8">
        <h2 className="text-2xl font-medium">لیست تسک‌ها</h2>
        <AddItem />
      </div>

      <Filter form={filterForm} setForm={setFilterForm} page={page} perPage={perPage} />

      <div className="flex flex-col border border-neutral-300 rounded overflow-hidden mb-4">
        <div className="grid grid-cols-12 border-b border-b-neutral-300 bg-neutral-100 *:text-center *:p-2">
          <div className="col-span-5 border-l border-neutral-300">عنوان</div>
          <div className="col-span-2 border-l border-neutral-300">تاریخ ایجاد</div>
          <div className="col-span-2 border-l border-neutral-300">وضعیت</div>
          <div className="col-span-3"></div>
        </div>
        {response?.data?.data?.length ? (
          response?.data?.data.map((item, i) => {
            return (
              <div key={i} className="grid grid-cols-12 *:text-center *:p-2 odd:bg-neutral-50">
                <div className="col-span-5 border-l border-neutral-300">{item?.title}</div>
                <div className="col-span-2 border-l border-neutral-300">
                  {new Date(item?.creationDate).toLocaleDateString("fa-IR")}
                </div>
                <div className="col-span-2 border-l border-neutral-300">
                  {item?.isCompleted ? "تکمیل شده" : "تکمیل نشده"}
                </div>
                <div className="col-span-3 flex justify-center items-center gap-2 *:cursor-pointer">
                  <UpdateItem selectedItem={item} />
                  <DeleteItem selectedItem={item} />
                  {!item?.isCompleted && <ToggleItem selectedItem={item} />}
                </div>
              </div>
            );
          })
        ) : (
          <div className="min-h-64 flex justify-center items-center">لیست تسک‌ها خالی است.</div>
        )}
      </div>

      <Pagination data={response?.data} page={page} setPage={setPage} />
    </div>
  );
};
