import QrReader from "react-qr-reader";

const QrRead = ({isOpened, setIsOpened}) => {

  const onScan = (data: String) => {
    if (data) {
      alert(data);
      setIsOpened(!isOpened)
    }
  }
  
  const onError = () => {
    console.log("on error");
  }

  const closeCamera= () => {
    setIsOpened(!isOpened)
  }


  return (
    <div className="fixed z-100 top-0 left-0 w-2/3">
      <QrReader delay={300} onScan={onScan} onError={onError} className="w-full" />
      <div className="px-10">
        <button className="bg-pink-600 text-white p-2 mt-10 duration-300 rounded-md hover:bg-pink-500 text-md w-full" onClick={closeCamera}>閉じる</button>
      </div>
    </div>
  )
}

export default QrRead;