import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";

import * as API from "@/api";
import * as Types from "@/types";

export const useRegister = (
  onSuccessRegister?: () => void,
  inquiryOptions?: UseMutationOptions<Types.User.FetchAllDto[], Error, Omit<Types.User.FetchAllDto, "id">>,
  registerOptions?: UseMutationOptions<Types.User.FetchAllDto, Error, Omit<Types.User.FetchAllDto, "id">>,
) => {
  const queryClient = useQueryClient();

  // Inquiry
  const hasExistingUserMutation = useMutation<Types.User.FetchAllDto[], Error, Omit<Types.User.FetchAllDto, "id">>({
    mutationFn: (info: Omit<Types.User.FetchAllDto, "id">) => {
      const cellphoneQuery = `cellphone=${info?.cellphone}`;
      return API.User.fetchAll({ query: cellphoneQuery });
    },
    onSuccess: (items, info) => {
      if (items.length) {
        //
      } else {
        userRegisterMutation.mutate({ ...info });
      }
    },
    ...inquiryOptions,
  });

  // Register
  const userRegisterMutation = useMutation<Types.User.FetchAllDto, Error, Omit<Types.User.FetchAllDto, "id">>({
    mutationFn: (info: Omit<Types.User.FetchAllDto, "id">) =>
      API.Auth.register({
        cellphone: +info?.cellphone,
        firstname: info?.firstname,
        lastname: info?.lastname,
        password: info?.password,
      }),
    onSuccess: (res) => {
      queryClient.setQueryData(["profile"], {
        id: res?.id,
        firstname: res?.firstname,
        lastname: res?.lastname,
        cellphone: res?.cellphone,
      });

      if (onSuccessRegister) onSuccessRegister();
    },
    ...registerOptions,
  });

  return { userRegister: hasExistingUserMutation.mutate };
};
