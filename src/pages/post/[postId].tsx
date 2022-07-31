import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@mantine/core";
import { Layout } from "../../components/Layout";
import { ConfirmModal } from "src/components/ConfirmModal";
import toast, { Toaster } from "react-hot-toast";
import dayjs from "dayjs";
import {
  requestHttpGet,
  requestHttpPatch,
  requestHttpDelete,
} from "src/utils/requestBase";

type ConfirmItem = {
  msg: string;
  confirmFunc: (() => Promise<void>) | undefined;
};

const UPDATE_MSG = {
  confirm: "更新しますか？",
  success: "更新しました",
  error: "更新に失敗しました",
};

const DELETE_MSG = {
  confirm: "削除しますか？",
  success: "削除しました",
  error: "削除に失敗しました",
};

const PostId = () => {
  const router = useRouter();
  const [post, setPost] = useState({
    id: "",
    title: "",
    content: "",
    createdAt: "",
    updatedAt: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [confirmItem, setConfirmItem] = useState<ConfirmItem>({
    msg: "",
    confirmFunc: undefined,
  });

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const res = await requestHttpGet(`/owner/posts/${router.query.postId}/`);
    setPost({ ...res.data });
  };

  const handleUpdate = async () => {
    const param = {
      title: post.title,
      content: post.content,
    };
    const res = await requestHttpPatch(
      `/owner/posts/${router.query.postId}/`,
      param
    );
    if (res.result) {
      toast.success(UPDATE_MSG.success);
      setShowModal(false);
    } else {
      toast.error(UPDATE_MSG.error);
    }
  };

  const handleDelete = async () => {
    const res = await requestHttpDelete(`/owner/posts/${router.query.postId}/`);
    if (res.result) {
      toast.success(DELETE_MSG.success);
      router.push("/post");
    } else {
      toast.error(DELETE_MSG.error);
    }
  };

  const handleConfirm = (type: "upd" | "del") => {
    type === "upd"
      ? setConfirmItem({ msg: UPDATE_MSG.confirm, confirmFunc: handleUpdate })
      : setConfirmItem({ msg: DELETE_MSG.confirm, confirmFunc: handleDelete });
    setShowModal(true);
  };

  return (
    <Layout>
      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        {...confirmItem}
      />
      <div className="pt-2">
        <Toaster />
        <div className="border-b w-full pb-2 mb-4">
          <h1 className="inline-block text-2xl font-bold text-cyan-600 tracking-widest">
            投稿内容編集
          </h1>
        </div>
        <div className="mx-auto mt-8 px-4 max-w-6xl">
          <div className="mb-6">
            <p className="text-sm text-slate-500">
              {`作成日: ${dayjs(post.createdAt).format("YYYY/MM/DD HH:mm:ss")}`}
            </p>
            <p className="text-sm text-slate-500">
              {`更新日: ${dayjs(post.updatedAt).format("YYYY/MM/DD HH:mm:ss")}`}
            </p>
          </div>
          <div className="mb-6">
            <h2 className="mb-2 text-slate-600">タイトル</h2>
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
            <h2 className="mb-2  text-slate-600">内容</h2>
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
            onClick={() => handleConfirm("upd")}
          >
            更新
          </Button>
          <Button
            size="sm"
            radius="xl"
            className="ml-4 px-8 bg-pink-600 hover:bg-pink-500"
            onClick={() => handleConfirm("del")}
          >
            削除
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default PostId;
