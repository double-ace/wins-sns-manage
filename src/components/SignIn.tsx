import { useState, useEffect } from "react";
import axios from "axios";
import { LayoutLogin } from "./LayoutLogin";
import { Alert } from "./Alert";

export const SignIn = () => {
  useEffect(() => {
    if (localStorage.getItem("access")) {
      window.location.href = "/";
    }
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ err: false, text: "" }); // アラートオブジェクト

  const emailChange = (event) => {
    setEmail(event.target.value);
  };

  const pwChange = (event) => {
    setPassword(event.target.value);
  };

  const login = async (event) => {
    event.preventDefault();

    if (localStorage.getItem("access")) {
      window.location.href = "/";
    }

    try {
      const token = await axios.post(
        "http://54.150.42.247/api/v1/auth/jwt/create",
        {
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      localStorage.setItem("access", token.data.access);
      window.location.href = "/";
    } catch {
      setAlert({
        ...alert,
        err: true,
        text: "メールアドレス or パスワードに誤りがあります",
      });
    }
  };

  return (
    <LayoutLogin>
      <div
        className="flex flex-col justify-center items-center h-3/4 lg:h-2/3 p-4 divide-y divide-gray-200"
        style={{ height: "40rem" }}
      >
        {alert.err && <Alert text={alert.text} />}
        <form className="block px-8 md:px-0">
          <h1 className="font-medium text-3xl mb-6 md:mb-12 text-center tracking-widest">
            ログイン
          </h1>
          <div className="my-7 text-md">
            <label>メールアドレス</label>
            <input
              type="text"
              value={email}
              onChange={emailChange}
              className="rounded-sm px-4 py-2 mt-3 bg-gray-100 w-full border border-gray-300"
              placeholder="Email"
            />
          </div>
          <div className="my-7 text-md">
            <label>パスワード</label>
            <input
              type="password"
              value={password}
              onChange={pwChange}
              className="rounded-sm px-4 py-2 mt-3 bg-gray-100 w-full border border-gray-300"
              placeholder="Password"
            />
          </div>
          <button
            onClick={login}
            className="block bg-green-700 text-white mt-9 p-3 duration-300 rounded-sm hover:bg-green-600 w-full"
          >
            ログイン
          </button>
        </form>
      </div>
    </LayoutLogin>
  );
};
