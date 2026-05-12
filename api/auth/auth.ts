import { Auth, User } from "@/types";

export const login = async ({
  cellphone,
  password,
}: {
  cellphone: number;
  password: string;
}): Promise<Auth.LoginDto> => {
  const res = await fetch("http://localhost:9000/users", {
    method: "POST",
    body: JSON.stringify({ cellphone, password }),
  });
  return res.json();
};

export const register = async (userInfo: {
  firstname: string;
  lastname: string;
  cellphone: number;
  password: string;
}): Promise<User.FetchAllDto> => {
  const res = await fetch("http://localhost:9000/users", {
    method: "POST",
    body: JSON.stringify({ ...userInfo }),
  });
  return res.json();
};
