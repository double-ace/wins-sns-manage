import { useState, useEffect, SetStateAction } from "react";
import QrReader from "react-qr-reader";
import { requestHttpPatch } from "src/utils/requestBase";

const QrRead = ({ isOpened, setIsOpened }) => {
  const [userId, setuserId] = useState("");

  useEffect(() => {
    callAPI();
  }, [userId]);

  const callAPI = async () => {
    if (userId) {
      await requestHttpPatch(`/owner/visit/${userId}/`, {});
    }
  };

  const onScan = async (data: string) => {
    if (data) {
      if (data !== userId) {
        setuserId(data);
      }
      console.log("read!!!!!!");
      setIsOpened(!isOpened);
    }
  };

  const onError = () => {
    console.log("on error");
  };

  const closeCamera = () => {
    setIsOpened(!isOpened);
  };

  return (
    <div className="fixed z-100 inset-0 w-full p-24">
      <QrReader
        delay={300}
        onScan={onScan}
        onError={onError}
        className="w-full max-w-xl mx-auto"
      />
      <div className="w-full max-w-xl mx-auto">
        <button
          className="bg-indigo-900 text-white p-2 mt-10 duration-300 rounded-md hover:bg-indigo-600 text-md mx-auto w-full"
          onClick={closeCamera}
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default QrRead;
