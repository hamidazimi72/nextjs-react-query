"use client";

import { useCreateTask } from "@/hooks/task";

export const AddItem = () => {
  const { createTask } = useCreateTask();

  const renderAddItem = () => {
    const title = window.prompt("عنوان تسک مورد نظر را بنویسید.");

    if (!title) {
      window.alert("عنوان تسک نمی‌تواند خالی باشد.");
      return;
    }

    if (title) createTask(title);
  };

  return (
    <button className="p-2 rounded bg-green-200 text-green-600 w-24 cursor-pointer" onClick={renderAddItem}>
      افزودن
    </button>
  );
};
