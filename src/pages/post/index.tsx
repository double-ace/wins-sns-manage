import { useState, useEffect } from "react";
import Link from "next/link";
import { Layout } from "../../components/Layout";
import toast, { Toaster } from "react-hot-toast";
import { requestHttpGet, requestHttpPost } from "src/utils/requestBase";
import dayjs from "dayjs";

type Post = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export default function Home() {
  const [postList, setPostList] = useState<Post[]>([]);
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const res = await requestHttpGet("/owner/posts/");
    res.result && setPostList([...res.data]);
  };

  const posts = postList.map((item: Post) => {
    const { id, title, content, created_at, updated_at } = item;
    return (
      <Link href={`/post/${id}`} key={id}>
        <a className="block p-2 border-b hover:bg-slate-100">
          <p className="text-lg text-slate-700">{title}</p>
          <p className="text-md text-slate-600">{content}</p>
          <div>
            <p className="text-xs text-slate-500">
              {`作成日: ${dayjs(created_at).format("YYYY/MM/DD HH:mm:ss")}`}
            </p>
            <p className="text-xs text-slate-500">
              {`更新日: ${dayjs(updated_at).format("YYYY/MM/DD HH:mm:ss")}`}
            </p>
          </div>
        </a>
      </Link>
    );
  });

  return (
    <Layout>
      <div className="pt-2">
        <Toaster />
        <div className="border-b w-full pb-2 mb-4">
          <h1 className="inline-block text-2xl font-bold text-cyan-600 tracking-widest">
            投稿一覧
          </h1>
          <Link href="/post/create">
            <a className="inline-block ml-4 py-2 px-4 rounded-full text-white bg-cyan-600 hover:bg-cyan-500 pointer">
              新規作成
            </a>
          </Link>
        </div>
        <div className="mx-auto md:mx-16 mt-8 px-4 max-w-4xl">{posts}</div>
      </div>
    </Layout>
  );
}
