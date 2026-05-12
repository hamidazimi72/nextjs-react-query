"use client";

import { useUpdateTask } from "@/hooks/task";
import * as Types from "@/types";

export const ToggleItem = ({ selectedItem }: { selectedItem: Types.Task.FetchAllDto }) => {
  const { updateTask } = useUpdateTask();

  const renderToggleItem = () => {
    if (window.confirm("آیا تسک مورد نظر تکمیل شده؟")) {
      updateTask({ id: selectedItem?.id, body: { isCompleted: !selectedItem?.isCompleted } });
    } else {
      //
    }
  };

  return (
    <button className="p-0.5 rounded bg-green-200 text-green-600 w-16" onClick={renderToggleItem}>
      تکمیل
    </button>
  );
};
