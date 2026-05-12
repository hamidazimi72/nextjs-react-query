import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";

import * as API from "@/api";
import * as Types from "@/types";

export const useDeleteTask = (options?: UseMutationOptions<Types.Task.FetchAllDto, Error, { id: string }>) => {
  const queryClient = useQueryClient();

  const deleteTaskMutation = useMutation<Types.Task.FetchAllDto, Error, { id: string }>({
    mutationFn: API.Task.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    ...options,
  });

  return {
    deleteTask: deleteTaskMutation.mutate,
    ...deleteTaskMutation,
  };
};
