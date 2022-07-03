import { useState, useEffect } from "react";
import Link from "next/link";
import { Avatar } from "@mantine/core";
import { Layout } from "src/components/Layout";
import dayjs from "dayjs";
import { requestHttpGet } from "src/utils/requestBase";

type ChatRoom = {
  id: string;
  status: string;
  creator: {
    id: string;
    profile_id: string;
    family_name: string;
    first_name: string;
    nickname: string;
    profile_image: string;
  };
  member: string;
  updated_by: string;
  updated_at: string;
  message: {
    id: string;
    content: string;
    sender: string;
    room: string;
    created_at: string;
  };
};

const ChatRoomList = () => {
  const [roomList, setRoomList] = useState<ChatRoom[]>([]);

  useEffect(() => {
    getChat();
  }, []);

  const getChat = async () => {
    const res = await requestHttpGet("/chat/rooms/");
    res.result && setRoomList([...res.data]);
  };

  const chats = roomList.map((item: ChatRoom) => {
    const { id, status, creator, updated_at, message } = item;
    return (
      <Link href={`/chat/${id}?profileId=${creator.profile_id}`} key={id}>
        <a className="block p-2 border-b hover:bg-slate-100">
          <div className="flex">
            <Avatar radius="xl" color="cyan" src={creator.profile_image} />
            <div className="ml-4">
              <p className="text-lg text-slate-700">{`${creator.family_name} ${creator.first_name} (${creator.nickname})`}</p>
              <p className="text-md text-slate-600">{message.content}</p>
              <p className="text-xs text-slate-500">
                {dayjs(updated_at).format("YYYY/MM/DD HH:mm:ss")}
              </p>
            </div>
          </div>
        </a>
      </Link>
    );
  });

  return (
    <Layout>
      <div className="pt-2">
        <div className="border-b w-full pb-2 mb-4">
          <h1 className="inline-block text-2xl font-bold text-cyan-600 tracking-widest">
            チャット一覧
          </h1>
        </div>
        <div className="mx-auto md:mx-16 mt-8 px-4 max-w-4xl">{chats}</div>
      </div>
    </Layout>
  );
};

export default ChatRoomList;
