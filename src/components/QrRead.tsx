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

  return (

    <QrReader delay={300} onScan={onScan} onError={onError} className="w-1/3" />
  )
}

export default QrRead;