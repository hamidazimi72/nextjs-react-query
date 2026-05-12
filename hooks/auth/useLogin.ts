import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";

import * as API from "@/api";
import * as Types from "@/types";

type VariablesType = { cellphone: string; password: string };

export const useLogin = (
  onSuccess?: () => void,
  options?: UseMutationOptions<Types.User.FetchAllDto[], Error, VariablesType>,
) => {
  const queryClient = useQueryClient();

  return useMutation<Types.User.FetchAllDto[], Error, VariablesType>({
    mutationFn: () => API.User.fetchAll(),
    onSuccess: (res, variables) => {
      const findedUser = res.find((u) => u?.cellphone === +variables?.cellphone);

      if (!findedUser) {
        console.log("شماره موبایل در سیستم وجود ندارد!");
        return;
      }

      if (findedUser?.password !== variables?.password) {
        console.log("رمز عبور صحیح نمی‌باشد!");
        return;
      }

      queryClient.setQueryData(["userInfo"], findedUser);
      localStorage.setItem("userInfo", JSON.stringify(findedUser));

      if (onSuccess) onSuccess();
    },
    ...options,
  });
};
