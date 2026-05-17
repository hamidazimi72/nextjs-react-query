import { AxiosResponse } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";

import * as API from "@/api";
import * as Types from "@/types";

type BodyType = { title?: string; isCompleted?: boolean };
type VaribablesType = { id: string; body: BodyType };

export const useUpdateTask = (
  options?: UseMutationOptions<AxiosResponse<Types.Task.FetchAllDto>, Error, VaribablesType>,
) => {
  const queryClient = useQueryClient();

  const updateTaskMutation = useMutation<AxiosResponse<Types.Task.FetchAllDto>, Error, VaribablesType>({
    mutationFn: API.Task.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    ...options,
  });

  return {
    updateTask: updateTaskMutation.mutate,
    ...updateTaskMutation,
  };
};
