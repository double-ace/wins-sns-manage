import { useState } from "react";
import { Button } from "@mantine/core";
import { Layout } from "../../components/Layout";
import toast, { Toaster } from "react-hot-toast";
import { requestHttpPost } from "src/utils/requestBase";
import { ConfirmModal } from "src/components/ConfirmModal";

const POST_MESSAGE = {
  confirm: "投稿しますか？",
  success: "投稿しました",
  error: "投稿に失敗しました",
};

const initPost = {
  title: "",
  content: "",
};

export default function Home() {
  const [post, setPost] = useState({ ...initPost });
  const [showModal, setShowModal] = useState(false);

  const handlePost = async () => {
    const param = {
      title: post.title,
      content: post.content,
    };
    console.log(param);
    console.log(localStorage.getItem("access"));
    const res = await requestHttpPost("/owner/posts/", param);
    if (res.result) {
      setPost(initPost);
      toast.success(POST_MESSAGE.success);
    } else {
      toast.error(POST_MESSAGE.error);
    }
  };

  return (
    <Layout>
      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        msg={POST_MESSAGE.confirm}
        confirmFunc={handlePost}
      />
      <div className="pt-2">
        <Toaster />
        <div className="border-b w-full pb-2 mb-4">
          <h1 className="inline-block text-2xl font-bold text-cyan-600 tracking-widest">
            投稿作成
          </h1>
        </div>
        <div className="mx-auto mt-8 px-4 max-w-6xl">
          <div className="mb-6">
            <h2 className="mb-2">タイトル</h2>
            <input
              type="text"
              className="w-3/5 p-2 border rounded-md"
              value={post.title}
              onChange={(e) =>
                setPost((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div className="mb-4">
            <h2 className="mb-2">内容</h2>
            <textarea
              className="w-full p-2 border rounded-md"
              value={post.content}
              rows={10}
              onChange={(e) =>
                setPost((prev) => ({ ...prev, content: e.target.value }))
              }
            ></textarea>
          </div>
          <Button
            size="sm"
            radius="xl"
            className="px-8 bg-cyan-600 hover:bg-cyan-500"
            onClick={() => setShowModal(true)}
          >
            投稿
          </Button>
        </div>
      </div>
    </Layout>
  );
}
