import QrReader from "react-qr-reader";
import axios from 'axios'

const QrRead = ({isOpened, setIsOpened}) => {

  const onScan = async (data: String) => {
    if (data) {
      await axios.patch(
        `https://api.mahjong-wins.com/api/v1/manage/visit/${data}/`,
        {},
        {
          headers: { Authorization: `JWT ${localStorage.getItem("access")}` },
        }
      )
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
    <div className="fixed z-100 top-0 left-0 w-2/3" style={{width: "40%", left: "30%"}}>
      <QrReader delay={300} onScan={onScan} onError={onError} className="w-full" />
      <div className="px-10">
        <button className="bg-indigo-600 text-white p-2 mt-10 duration-300 rounded-md hover:bg-indigo-500 text-md w-full" onClick={closeCamera}>閉じる</button>
      </div>
    </div>
  )
}

export default QrRead;