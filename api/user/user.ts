import { User } from "@/types";

export const fetchAll = async (options?: { query?: string }): Promise<User.FetchAllDto[]> => {
  const res = await fetch(`http://localhost:9000/users${options?.query ? `?${options?.query}` : ""}`);

  return res.json();
};
