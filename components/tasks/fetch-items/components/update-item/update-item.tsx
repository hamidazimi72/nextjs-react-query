"use client";

import { useUpdateTask } from "@/hooks/task";
import * as Types from "@/types";

export const UpdateItem = ({ selectedItem }: { selectedItem: Types.Task.FetchAllDto }) => {
  const { updateTask } = useUpdateTask();

  const renderUpdateItem = () => {
    const title = window.prompt("عنوان تسک مورد نظر را بنویسید.", selectedItem?.title);

    if (!title) {
      window.alert("عنوان تسک نمی‌تواند خالی باشد.");
      return;
    }

    if (title) updateTask({ id: selectedItem?.id, body: { title } });
  };

  return (
    <button className="p-0.5 rounded bg-sky-200 text-sky-600 w-16" onClick={renderUpdateItem}>
      ویرایش
    </button>
  );
};
