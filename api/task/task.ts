import { Task } from "@/types";

export const fetchAll = async (
  query?: string,
): Promise<{
  first: number;
  prev: number;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: Task.FetchAllDto[];
}> => {
  const res = await fetch(`http://localhost:9000/tasks${query || ""}`);

  return res.json();
};

export const save = async ({ title, userId }: { title: string; userId: string }): Promise<Task.FetchAllDto> => {
  const res = await fetch("http://localhost:9000/tasks", {
    method: "POST",
    body: JSON.stringify({ title, isCompleted: false, creationDate: new Date(), userId }),
  });

  return res.json();
};

export const update = async ({
  id,
  body,
}: {
  id: string;
  body: { title?: string; isCompleted?: boolean };
}): Promise<Task.FetchAllDto> => {
  const res = await fetch(`http://localhost:9000/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ ...body }),
  });

  return res.json();
};

export const remove = async ({ id }: { id: string }): Promise<Task.FetchAllDto> => {
  const res = await fetch(`http://localhost:9000/tasks/${id}`, {
    method: "DELETE",
  });

  return res.json();
};
