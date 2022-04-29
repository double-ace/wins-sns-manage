import axios, { AxiosResponse } from "axios";
import { requestHttpPost } from "./requestBase";

type AuthParams = {
  email: string;
  password: string;
};

export const authLogin = async (params: AuthParams): Promise<any> => {
  // let ret = false;
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
      console.log("ret: ", ret);
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

export const createAccount = async (params: AuthParams): Promise<boolean> => {
  let ret = false;
  try {
    const createRes = await requestHttpPost("/user/create/", params, false);
    // if (createRes.status === 201) {
    if (true) {
      const tokenRes = await requestHttpPost(
        "/auth/jwt/create/",
        params,
        false
      );
      localStorage.setItem("access", tokenRes.data.access);
      localStorage.setItem("refresh", tokenRes.data.refresh);
      ret = true;
    }
  } catch (e) {
    alert(e);
  }

  return ret;
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
