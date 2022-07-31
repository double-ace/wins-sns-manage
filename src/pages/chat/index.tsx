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
    profileId: string;
    familyName: string;
    firstName: string;
    nickname: string;
    profileImage: string;
  };
  member: string;
  updatedBy: string;
  updatedAt: string;
  message: {
    id: string;
    content: string;
    sender: string;
    room: string;
    createdAt: string;
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
    const { id, status, creator, updatedAt, message } = item;
    return (
      <Link href={`/chat/${id}?profileId=${creator.profileId}`} key={id}>
        <a className="block p-2 border-b hover:bg-slate-100">
          <div className="flex">
            <Avatar radius="xl" color="cyan" src={creator.profileImage} />
            <div className="ml-4">
              <p className="text-lg text-slate-700">{`${creator.familyName} ${creator.firstName} (${creator.nickname})`}</p>
              <p className="text-md text-slate-600">{message.content}</p>
              <p className="text-xs text-slate-500">
                {dayjs(updatedAt).format("YYYY/MM/DD HH:mm:ss")}
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
