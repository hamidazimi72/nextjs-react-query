import axios, { AxiosResponse } from "axios";

import { Task } from "@/types";

import { axiosClient } from "../config";

export const fetchAll = async (params?: {
  userId: string;
  _page: string;
  _per_page: string;
  title?: string;
  isCompleted?: string;
}): Promise<
  AxiosResponse<{
    first: number;
    prev: number;
    next: number;
    last: number;
    pages: number;
    items: number;
    data: Task.FetchAllDto[];
  }>
> => {
  const res = await axiosClient.get("/tasks", { params: { ...params } });
  return res;
};

export const save = async ({
  title,
  userId,
}: {
  title: string;
  userId: string;
}): Promise<AxiosResponse<Task.FetchAllDto>> => {
  const res = await axiosClient.post("/tasks", { title, isCompleted: false, creationDate: new Date(), userId });
  return res;
};

export const update = async ({
  id,
  body,
}: {
  id: string;
  body: { title?: string; isCompleted?: boolean };
}): Promise<AxiosResponse<Task.FetchAllDto>> => {
  const res = await axiosClient.patch(`/tasks/${id}`, { ...body });
  return res;
};

export const remove = async ({ id }: { id: string }): Promise<AxiosResponse<Task.FetchAllDto>> => {
  const res = await axiosClient.delete(`/tasks/${id}`);
  return res;
};
