import axios from "axios";
import { postRefresh, delToken } from "./requestAuth";

const baseUrl = process.env.BASE_URL || "http://192.168.11.2:8000/api/v1";

export type ResponseData = {
  result: boolean;
  status?: number;
  data: any;
  notLogin?: boolean;
};

export const requestHttpGet = async (
  endpoint: string,
  param?: { [key: string]: string }
): Promise<ResponseData> => {
  let ret: ResponseData = {
    result: false,
    data: [],
  };
  let queryPath = "";
  const queryList = [];

  if (param) {
    queryPath = "?";
    for (const [key, value] of Object.entries(param)) {
      queryList.push(key + "=" + value);
    }
    queryPath = queryList.join("&");
  }

  const headers = createHeader();
  try {
    const res = await axios.get(baseUrl + endpoint, headers);
    ret.result = true;
    ret.data = res.data;
  } catch (e: any) {
    console.log("requestHttpGetError========================");
    // 認証エラーの場合はトークンを取り直し再リクエスト
    if (e.response) {
      if (e.response.status === 401) {
        try {
          await postRefresh(baseUrl);
          try {
            const retakeHeaders = createHeader();
            const res = await axios.get(baseUrl + endpoint, retakeHeaders);
            ret.result = true;
            ret.data = res.data;
          } catch {
            // 正しいトークンでのリクエストエラー
          }
        } catch {
          // リフレッシュトークンが期限切れ->ログイン画面
          delToken();
          location.href = "/signin";
        }
      }
    } else {
      console.log("server error");
    }
  }

  return ret;
};

export const requestHttpPost = async (
  endpoint: string,
  param: { [key: string]: string | boolean | null },
  requiredHeader: boolean = true
): Promise<ResponseData> => {
  let ret: ResponseData = {
    result: false,
    data: "",
  };
  console.log(requiredHeader);

  const headers = requiredHeader ? createHeader() : null;

  try {
    const res = headers
      ? await axios.post(baseUrl + endpoint, param, headers)
      : await axios.post(baseUrl + endpoint, param);
    ret = { ...ret, result: true, data: res.data };
  } catch (e: any) {
    console.log("requestHttpPostError========================");
    // 認証エラーの場合はトークンを取り直し再リクエスト
    if (e.response) {
      if (e.response.status === 401) {
        try {
          await postRefresh(baseUrl);
          try {
            const retakeHeaders = requiredHeader ? createHeader() : null;
            const res = retakeHeaders
              ? await axios.post(baseUrl + endpoint, param, retakeHeaders)
              : await axios.post(baseUrl + endpoint, param);
            ret.result = true;
            ret.data = res.data;
          } catch {
            // 正しいトークンでのリクエストエラー
          }
        } catch {
          // リフレッシュトークンが期限切れ->ログイン画面
          delToken();
          location.href = "/signin";
        }
      }
    } else {
      console.log("server error");
    }
  }

  return ret;
};

export const requestHttpPatch = async (
  endpoint: string,
  param: { [key: string]: any }
): Promise<ResponseData> => {
  let ret: ResponseData = {
    result: false,
    data: "",
  };

  const headers = createHeader();

  try {
    const res = await axios.patch(baseUrl + endpoint, param, headers);
    ret = { ...ret, result: true, data: res.data };
  } catch (e: any) {
    console.log("requestHttpPatchError========================");
    // 認証エラーの場合はトークンを取り直し再リクエスト
    if (e.response) {
      if (e.response.status === 401) {
        try {
          await postRefresh(baseUrl);
          try {
            const retakeHeaders = createHeader();
            const res = await axios.patch(
              baseUrl + endpoint,
              param,
              retakeHeaders
            );
            ret.result = true;
            ret.data = res.data;
          } catch {
            // 正しいトークンでのリクエストエラー
          }
        } catch {
          // リフレッシュトークンが期限切れ->ログイン画面
          delToken();
          location.href = "/signin";
        }
      }
    } else {
      console.log("server error");
    }
  }

  return ret;
};

export const requestHttpDelete = async (
  endpoint: string
): Promise<ResponseData> => {
  let ret: ResponseData = {
    result: false,
    data: "",
  };

  const headers = createHeader();

  try {
    const res = await axios.delete(baseUrl + endpoint, headers);
    ret = { ...ret, result: true, data: res.data };
  } catch (e: any) {
    console.log("requestHttpDeleteError========================");
    // 認証エラーの場合はトークンを取り直し再リクエスト
    if (e.response) {
      if (e.response.status === 401) {
        try {
          await postRefresh(baseUrl);
          try {
            const retakeHeaders = createHeader();
            const res = await axios.delete(baseUrl + endpoint, retakeHeaders);
            ret.result = true;
            ret.data = res.data;
          } catch {
            // 正しいトークンでのリクエストエラー
          }
        } catch {
          // リフレッシュトークンが期限切れ->ログイン画面
          delToken();
          location.href = "/signin";
        }
      }
    } else {
      console.log("server error");
    }
  }

  return ret;
};

const createHeader = () => {
  let token = "";
  try {
    const res = localStorage.getItem("access");

    if (res) {
      token = res;
    } else {
      console.log("アクセストークンが存在しません");
    }
  } catch (e) {
    console.log(e);
  }

  return {
    headers: {
      Authorization: `JWT ${token}`,
    },
  };
};
