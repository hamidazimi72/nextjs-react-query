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
  params: { page: number; perPage: number; title?: string; status?: string },
  options?: UseQueryOptions<ResultType, Error>,
) => {
  const userId: Types.User.FetchAllDto["id"] =
    typeof window !== "undefined" ? JSON.parse(localStorage?.getItem("userInfo") || "{}")?.id : "";

  const queryKey = ["tasks", params?.page, params?.perPage];

  if (params?.title) queryKey.push(String(params.title));
  if (params?.status) queryKey.push(String(params.status));

  return useQuery<ResultType, Error>({
    queryKey,
    queryFn: () => {
      const queryObject: { userId: string; _page: string; _per_page: string; title?: string; isCompleted?: string } = {
        userId,
        _page: String(params?.page),
        _per_page: String(params?.perPage),
      };

      if (params?.title) {
        queryObject.title = params.title;
      }

      if (params?.status) {
        queryObject.isCompleted = params?.status;
      }

      const queryString: string = `?${new URLSearchParams({ ...queryObject }).toString()}`;

      return API.Task.fetchAll(queryString);
    },
    placeholderData: (prevData) => prevData,
    ...options,
  });
};
