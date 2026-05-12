import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import * as API from "@/api";
import * as Types from "@/types";

type ResultType = {
  first: number;
  prev: number;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: Types.Task.FetchAllDto[];
};

export const useGetTasks = (
  params: { page: number; perPage: number; q?: string },
  options?: UseQueryOptions<ResultType, Error>,
) => {
  let userId: Types.User.FetchAllDto["id"] = "";
  if (typeof window !== "undefined") {
    userId = JSON.parse(localStorage?.getItem("userInfo") || "{}")?.id || "";
  }

  return useQuery<ResultType, Error>({
    queryKey: ["tasks", params?.page, params?.perPage],
    queryFn: () => {
      const queryObject = {
        userId,
        _page: String(params?.page),
        _per_page: String(params?.perPage),
      };

      const queryString: string = `?${new URLSearchParams({ ...queryObject }).toString()}`;

      return API.Task.fetchAll(queryString);
    },
    placeholderData: (prevData) => prevData,
    ...options,
  });
};
