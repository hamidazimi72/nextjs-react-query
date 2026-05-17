import { AxiosResponse } from "axios";

import * as Types from "@/types";

import { axiosClient } from "../config";

export const register = async (userInfo: {
  firstname: string;
  lastname: string;
  cellphone: number;
  password: string;
}): Promise<AxiosResponse<Types.User.FetchAllDto>> => {
  const res = await axiosClient.post("/users", { ...userInfo });
  return res;

  // const res = await fetch("http://localhost:9000/users", {
  //   method: "POST",
  //   body: JSON.stringify({ ...userInfo }),
  // });
  // return res.json();
};
