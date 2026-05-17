import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:9000",
  timeout: 10000,
});

axiosClient.interceptors.response.use(async (response) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return response;
});
