import axios, { AxiosResponse } from "axios";
import { requestHttpPost } from "./requestBase";

type AuthParams = {
  email: string;
  password: string;
};

export const authLogin = async (params: AuthParams): Promise<any> => {
  const ret: { result: boolean; status: number | undefined } = {
    result: false,
    status: 0,
  };
  try {
    const res = await requestHttpPost("/auth/jwt/create/", params, false);
    if (res.result) {
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      ret.result = true;
      ret.status = res.status;
    }
  } catch (e) {
    console.log("authLoginError=========");
    alert(e);
  }

  return ret;
};

export const postRefresh = async (baseUrl: string) => {
  const refresh = localStorage.getItem("refresh");
  const { data }: AxiosResponse<{ access: string; refresh: string }> =
    await axios.post(baseUrl + "/auth/jwt/refresh/", { refresh });
  localStorage.setItem("access", data.access);
  localStorage.setItem("refresh", data.refresh);
};

export const useRefreshToken = async () => {
  const refresh = localStorage.getItem("refresh");
  if (refresh) {
    await requestHttpPost("/auth/jwt/refresh/", { refresh }, false);
  }
};

export const delToken = (): void => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};
