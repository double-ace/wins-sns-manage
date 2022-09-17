import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Avatar, Button } from "@mantine/core";
import { Layout } from "src/components/Layout";
import dayjs from "dayjs";
import { requestHttpGet, requestHttpPost } from "src/utils/requestBase";

type Message = {
  id: string;
  content: string;
  sender: {
    id: string;
    familyName: string;
    firstName: string;
    nickname: string;
    profileImage: string;
  };
  me: string;
  room: string;
  createdAt: string;
};

const ChatRoom = () => {
  const router = useRouter();
  const [msg, setMsg] = useState<Message[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    getChat(true);
  }, []);

  const getChat = async (reqUser: boolean) => {
    const { roomId, userId } = router.query;
    const msgRes = await requestHttpGet(`/chat/messages/?room_id=${roomId}`);
    msgRes.result && setMsg([...msgRes.data]);
    if (reqUser) {
      const nameRes = await requestHttpGet(`/user/name/${userId}/`);
      if (nameRes.result) {
        const { familyName, firstName, nickname } = nameRes.data;
        setUsername(`${familyName} ${firstName} (${nickname})`);
      }
    }
  };

  const sendMsg = async () => {
    setIsSending(true);
    const param = {
      content: newMsg,
      room: router.query.roomId.toString(),
    };
    const res = await requestHttpPost("/chat/messages/", param);
    if (res.result) {
      getChat(false);
      setNewMsg("");
    }
    setIsSending(false);
  };

  const messages = msg.map((item: Message) => {
    const { id, content, sender, me, createdAt } = item;
    return sender.id === me ? (
      <div className="mb-4 flex flex-col items-end" key={id}>
        <div className="mr-2 flex flex-col items-end">
          <p className="bg-cyan-100 rounded-xl max-w-3xl p-2">{content}</p>
          <div>
            <p className="text-sm text-slate-400">
              {dayjs(createdAt).format("YYYY/MM/DD HH:mm:ss")}
            </p>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex mb-4" key={id}>
        <Avatar radius="xl" color="cyan" src={sender.profileImage} />
        <div className="ml-2 flex flex-col items-start">
          <p className="bg-slate-100 rounded-xl max-w-3xl p-2">{content}</p>
          <p className="text-sm text-slate-400">
            {dayjs(createdAt).format("YYYY/MM/DD HH:mm:ss")}
          </p>
        </div>
      </div>
    );
  });

  return (
    <Layout>
      <div className="pt-2 mb-32">
        <div className="border-b w-full pb-2 mb-4">
          <h1 className="inline-block text-2xl font-bold text-cyan-600 tracking-widest">
            {username}
          </h1>
        </div>
        <div className="mx-auto mt-8">{messages}</div>
      </div>
      <div className="fixed p-2 md:pl-40 bottom-0 left-0 right-0 border-t bg-white">
        <textarea
          className="w-full border p-2"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
        />
        <Button
          radius="xl"
          size="md"
          loading={isSending}
          className="px-6 bg-cyan-600 hover:bg-cyan-500 float-right"
          onClick={sendMsg}
        >
          送信
        </Button>
      </div>
    </Layout>
  );
};

export default ChatRoom;
