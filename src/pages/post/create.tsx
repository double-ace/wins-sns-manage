import { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { requestHttpPost } from "src/utils/requestBase";

export default function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("access")) {
      window.location.href = "/signin";
    }
  });

  const handlePost = async () => {
    const param = {
      title,
      content,
    };
    console.log(param);
    console.log(localStorage.getItem("access"));
    try {
      const res = await requestHttpPost("/owner/posts/", param);
      console.log(res.data);
      toast.success("投稿しました");
      setTitle("");
      setContent("");
    } catch {
      toast.error("投稿に失敗しました");
    }
  };

  return (
    <Layout>
      <div className="p-8 mx-auto">
        <Toaster />
        <div className="border-b w-full pb-2 mb-8">
          <h1 className="inline-block font-bold text-4xl text-blue-500 tracking-widest mr-8">
            投稿作成
          </h1>
          <Link href="/">
            <a className="bg-indigo-700 text-white p-2 duration-300 rounded-md hover:bg-indigo-600 w-28 text-md">
              顧客一覧表
            </a>
          </Link>
        </div>
        <div className="mx-auto px-4 max-w-6xl">
          <div className="mb-6">
            <h2 className="mb-2">タイトル</h2>
            <input
              type="text"
              className="w-3/5 p-2 border rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <h2 className="mb-2">内容</h2>
            <textarea
              className="w-full p-2 border rounded-md"
              value={content}
              rows={10}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <button
            className="py-2 px-8 rounded-3xl text-white bg-indigo-900 hover:bg-indigo-700"
            onClick={handlePost}
          >
            投稿
          </button>
        </div>
      </div>
    </Layout>
  );
}
