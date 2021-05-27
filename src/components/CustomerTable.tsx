import { useState, useEffect } from "react"
import axios from 'axios'

export const CustomerTable = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [targetEmail, setTargetEmail] = useState('')
  const [targetInfoId, setTargetInfoId] = useState('')
  const [targetUser, setTargetUser] = useState('')
  const [targetPoint, setTargetPoint] = useState(0)
  const [beforePoint, setBeforePoint] = useState(0)


  useEffect(() => {
    const getUsers = async () => {
      try {
        await axios.get(
          'http://54.150.42.247/api/v1/manage/users/',
          {
            headers: { Authorization: `JWT ${localStorage.getItem("access")}` },
          }
        ).then(res => setUsers(res.data))
      } catch {
        if (localStorage.getItem("access")) {
          localStorage.removeItem("access");
        }
        window.location.href = "/signin";
      }

    }

    getUsers();
    
  }, [showModal])

  const handleModal = (e) => { // ポイント編集モーダル表示
    e.preventDefault();
    setTargetEmail(e.currentTarget.value)
    users.forEach(item => {
      if(e.currentTarget.value === item.email) {
        setTargetUser(`${item.last_name} ${item.first_name}`)
        setTargetInfoId(item.info_id)
        setBeforePoint(item.point)
        setTargetPoint(item.point)
        console.log(typeof(item.point))
      }
    })
    setShowModal(true)
  }


  const handleInc = (e) => {
    e.preventDefault();
    setTargetPoint(Number(targetPoint) + 100)
  }

  const handleDec = (e) => {
    e.preventDefault();
    setTargetPoint(targetPoint - 100)
  }

  const handlePoint = async (e) => { // ポイント確定
    e.preventDefault();
    await axios.put(
      `http://54.150.42.247/api/v1/manage/point-change/${targetInfoId}/`,
      {
        email: targetEmail,
        point: targetPoint
      },
      {
        headers: { Authorization: `JWT ${localStorage.getItem("access")}` },
      }
    )
    setShowModal(false)
  }

  const closeModal = (e) => {
    e.preventDefault();
    setShowModal(false);
  }

  const handleVisit = async (e) => {
    e.preventDefault();
    await axios.patch(
      `http://54.150.42.247/api/v1/manage/visit/${targetInfoId}/`,
      {},
      {
        headers: { Authorization: `JWT ${localStorage.getItem("access")}` },
      }
    )
    setShowModal(false)
  }

  const PointChangeModal = ({name, point}) => {
    return (
      <>
      <div className="w-full h-full z-1" onClick={closeModal} style={{position: "fixed", background: "rgba(0, 0, 0, 0.4)"}}>
      </div>
      <div className="bg-white border rounded-md py-6 px-12 text-center shadow-2xl bg-gray-100 z-100" style={{position: 'fixed', top: '50%', left: '40%'}}>
        <p className="font-bold text-2xl text-gray-700 mb-6">ポイント変更</p>
        <button className="inline-block bg-pink-600 text-white rounded-md px-4" onClick={handleVisit}>来店</button>
        <p>{name}</p>
        <div className="mt-6">
          <p className="text-left pl-2 text-gray-500">{beforePoint}</p>
          <p className="text-left pl-2">⬇︎</p>
          <input type="number" value={point} className="border px-2 rounded-md mb-4" disabled></input>
          <button onClick={handleInc} className="h-full w-8 bg-gray-300 text-2xl rounded-lg inline-block mx-2">+</button>
          <button onClick={handleDec} className="h-full w-8 bg-gray-300 text-2xl rounded-lg inline-block">-</button>
        </div>
        <button className="bg-indigo-600 text-white rounded-md px-4" onClick={handlePoint}>実行</button>
      </div>
      </>
    )
  }


  const tableItem = users.map(item => {
    console.log("test")
    console.log(item)
    return (
      <tr key={item.email}>
        <th className="font-light border px-4 py-2">{item.last_name} {item.first_name}</th>
        <th className="font-light border px-4 py-2">{item.email}</th>
        <th className="font-light border px-4 py-2 text-right">{item.point}<button className="ml-4" value={item.email} onClick={handleModal}><img src="pencil.svg" width={20} height={20}/></button></th>
        <th className="font-light border px-4 py-2">{item.first_visit && `${new Date(item.first_visit).getFullYear()}-${new Date(item.first_visit).getMonth()+1}-${new Date(item.first_visit).getDate()}`}</th>
        <th className="font-light border px-4 py-2">{item.previous_visit && `${new Date(item.previous_visit).getFullYear()}-${new Date(item.previous_visit).getMonth()+1}-${new Date(item.previous_visit).getDate()}`}</th>
        <th className="font-light border px-4 py-2">{item.last_visit && `${new Date(item.last_visit).getFullYear()}-${new Date(item.last_visit).getMonth()+1}-${new Date(item.last_visit).getDate()}`}</th>
        <th className="font-light border px-4 py-2 text-right">{item.visit_count}</th>
        <th className="font-light border px-4 py-2 text-right">{item.continuous_visit_count}</th>
        <th className="font-light border px-4 py-2">{item.phone_number}</th>
        <th className="font-light border px-4 py-2">{item.birth_date}</th>
        <th className="font-light border px-4 py-2">{item.address_prefecture}</th>
        <th className="font-light border px-4 py-2">{item.address_city}</th>
        <th className="font-light border px-4 py-2">{item.hear_from}</th>
        <th className="font-light border px-4 py-2">{item.introduced}</th>
        <th className="font-light border px-4 py-2">{item.hope_rate}</th>
      </tr>
    )
  })

  return (
    <div>
      {showModal && <PointChangeModal name={targetUser} point={targetPoint} />}
      <table className="" style={{display: "block", overflowX: "scroll", whiteSpace: 'nowrap'}}>
        <thead style={{background: '#1D4ED8', color: '#fff'}}>
          <tr>
            <th className="px-4 py-2">顧客名</th>
            <th className="px-4 py-2">メールアドレス</th>
            <th className="px-8 py-2">保有ポイント</th>
            <th className="px-4 py-2">初回来店日</th>
            <th className="px-r py-2">前回来店日</th>
            <th className="px-4 py-2">最終来店日</th>
            <th className="px-4 py-2">来店回数</th>
            <th className="px-4 py-2">連続来店回数</th>
            <th className="px-4 py-2">電話番号</th>
            <th className="px-4 py-2">誕生日</th>
            <th className="px-4 py-2">お住まい（都道府県）</th>
            <th className="px-4 py-2">お住まい（市区町村）</th>
            <th className="px-4 py-2">来店きっかけ</th>
            <th className="px-4 py-2">紹介者</th>
            <th className="px-4 py-2">希望レート</th>
          </tr>
        </thead>
        <tbody>
          {tableItem}
        </tbody>
      </table>
    </div>

  )
}