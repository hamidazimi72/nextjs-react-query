import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";

import * as API from "@/api";
import * as Types from "@/types";

export const useCreateTask = (options?: UseMutationOptions<Types.Task.FetchAllDto, Error, string>) => {
  const userId: Types.User.FetchAllDto["id"] =
    typeof window !== "undefined" ? JSON.parse(localStorage?.getItem("userInfo") || "{}")?.id : "";

  const queryClient = useQueryClient();

  const createTaskMutation = useMutation<Types.Task.FetchAllDto, Error, string>({
    mutationFn: (title: string) => API.Task.save({ title, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    ...options,
  });

  return {
    createTask: createTaskMutation.mutate,
    ...createTaskMutation,
  };
};
