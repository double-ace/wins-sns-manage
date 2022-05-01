import QrReader from "react-qr-reader";
import { requestHttpPatch } from "src/utils/requestBase";

const QrRead = ({ isOpened, setIsOpened }) => {
  const onScan = async (data: String) => {
    if (data) {
      await requestHttpPatch(`/owner/visit/${data}/`, {});
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
