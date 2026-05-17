import { AxiosResponse } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";

import * as API from "@/api";
import * as Types from "@/types";

export const useRegister = (
  onSuccessRegister?: () => void,
  inquiryOptions?: UseMutationOptions<
    AxiosResponse<Types.User.FetchAllDto[]>,
    Error,
    Omit<Types.User.FetchAllDto, "id">
  >,
  registerOptions?: AxiosResponse<
    UseMutationOptions<Types.User.FetchAllDto>,
    Error,
    Omit<Types.User.FetchAllDto, "id">
  >,
) => {
  const queryClient = useQueryClient();

  // Inquiry
  const hasExistingUserMutation = useMutation<
    AxiosResponse<Types.User.FetchAllDto[]>,
    Error,
    Omit<Types.User.FetchAllDto, "id">
  >({
    mutationFn: (info) => {
      return API.User.fetchAll({ cellphone: info?.cellphone });
    },
    onSuccess: (items, info) => {
      if (items?.data.length) {
        console.log("کاربر با این شماره موبایل وجود دارد.");
      } else {
        userRegisterMutation.mutate({ ...info });
      }
    },
    ...inquiryOptions,
  });

  // Register
  const userRegisterMutation = useMutation<
    AxiosResponse<Types.User.FetchAllDto>,
    Error,
    Omit<Types.User.FetchAllDto, "id">
  >({
    mutationFn: (info) =>
      API.Auth.register({
        cellphone: +info?.cellphone,
        firstname: info?.firstname,
        lastname: info?.lastname,
        password: info?.password,
      }),
    onSuccess: (res) => {
      const data = res?.data;
      const user = {
        id: data?.id,
        firstname: data?.firstname,
        lastname: data?.lastname,
        cellphone: data?.cellphone,
      };

      queryClient.setQueryData(["profile"], user);
      localStorage.setItem("userInfo", JSON.stringify(user));

      if (onSuccessRegister) onSuccessRegister();
    },
    ...registerOptions,
  });

  return { userRegister: hasExistingUserMutation.mutate };
};
