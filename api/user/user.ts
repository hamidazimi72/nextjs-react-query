import { AxiosResponse } from "axios";

import { User } from "@/types";

import { axiosClient } from "../config";

export const fetchAll = async (params?: { cellphone?: number }): Promise<AxiosResponse<User.FetchAllDto[]>> => {
  const res = await axiosClient.get("/users", { params: { ...params } });
  return res;
};
