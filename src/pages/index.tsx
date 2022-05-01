import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { CustomerTable } from "../components/CustomerTable";
import { Layout } from "../components/Layout";
import { requestHttpGet } from "src/utils/requestBase";

export default function Home() {
  const [openQrReader, setOpenQrReader] = useState(false);
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await requestHttpGet("/owner/users/");
      setUserList(res.data);
    } catch {
      if (localStorage.getItem("access")) {
        localStorage.removeItem("access");
      }
      window.location.href = "/signin";
    }
    setIsLoading(false);
  };

  const QrReader = dynamic(() => import("../components/QrRead"), {
    ssr: false,
  });

  return (
    <Layout>
      {openQrReader && (
        <QrReader isOpened={openQrReader} setIsOpened={setOpenQrReader} />
      )}
      <div className="pt-2">
        <div className="border-b w-full pb-2 mb-4">
          <h1 className="inline-block text-2xl font-bold text-cyan-600 tracking-widest">
            顧客一覧
          </h1>
        </div>
        <CustomerTable userList={userList} isLoading={isLoading} />
      </div>
    </Layout>
  );
}
