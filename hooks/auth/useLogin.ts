import { AxiosResponse } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";

import * as API from "@/api";
import * as Types from "@/types";

type VariablesType = { cellphone: string; password: string };

export const useLogin = (
  onSuccess?: () => void,
  options?: UseMutationOptions<AxiosResponse<Types.User.FetchAllDto[]>, Error, VariablesType>,
) => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<Types.User.FetchAllDto[]>, Error, VariablesType>({
    mutationFn: ({ cellphone }) => API.User.fetchAll({ cellphone: +cellphone }),
    onSuccess: (res, variables) => {
      const list = res?.data;

      if (!list.length) {
        console.log("شماره موبایل در سیستم وجود ندارد!");
        return;
      }

      const user = list[0];

      if (user?.password !== variables?.password) {
        console.log("رمز عبور صحیح نمی‌باشد!");
        return;
      }

      queryClient.setQueryData(["userInfo"], user);
      localStorage.setItem("userInfo", JSON.stringify(user));

      if (onSuccess) onSuccess();
    },
    ...options,
  });
};
