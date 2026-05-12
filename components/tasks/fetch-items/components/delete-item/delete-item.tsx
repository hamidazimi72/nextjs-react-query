"use client";

import { useDeleteTask } from "@/hooks/task";
import * as Types from "@/types";

export const DeleteItem = ({ selectedItem }: { selectedItem: Types.Task.FetchAllDto }) => {
  const { deleteTask } = useDeleteTask();

  const renderDeleteItem = () => {
    if (window.confirm("آیا از حذف تسک مورد نظر اطمینان دارید؟")) {
      deleteTask({ id: selectedItem?.id });
    } else {
      //
    }
  };

  return (
    <button className="p-0.5 rounded bg-red-200 text-red-600 w-16" onClick={renderDeleteItem}>
      حذف
    </button>
  );
};
