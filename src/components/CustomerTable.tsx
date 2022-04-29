import { useState, useEffect } from "react";
import { Table, Modal, Button } from "@mantine/core";
import { requestHttpGet, requestHttpPatch } from "src/utils/requestBase";

export const CustomerTable = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [targetEmail, setTargetEmail] = useState("");
  const [targetInfoId, setTargetInfoId] = useState("");
  const [targetUser, setTargetUser] = useState("");
  const [targetPoint, setTargetPoint] = useState(0);
  const [beforePoint, setBeforePoint] = useState(0);

  useEffect(() => {
    const getUsers = async () => {
      try {
        await requestHttpGet("/owner/users/").then((res) => setUsers(res.data));
      } catch {
        if (localStorage.getItem("access")) {
          localStorage.removeItem("access");
        }
        window.location.href = "/signin";
      }
    };

    getUsers();
  }, [showModal]);

  const handleModal = (e) => {
    // ポイント編集モーダル表示
    e.preventDefault();
    setTargetEmail(e.currentTarget.value);
    users.forEach((item) => {
      if (e.currentTarget.value === item.email) {
        setTargetUser(`${item.family_name} ${item.first_name}`);
        setTargetInfoId(item.info_id);
        setBeforePoint(item.point);
        setTargetPoint(item.point);
        console.log(typeof item.point);
      }
    });
    setShowModal(true);
  };

  const handleInc = (e) => {
    e.preventDefault();
    setTargetPoint(Number(targetPoint) + 100);
  };

  const handleDec = (e) => {
    e.preventDefault();
    setTargetPoint(targetPoint - 100);
  };

  const handlePoint = async (e) => {
    // ポイント確定
    e.preventDefault();
    await requestHttpPatch(`/owner/point-change/${targetInfoId}/`, {
      email: targetEmail,
      point: targetPoint,
    });

    setShowModal(false);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  /*   const handleVisit = async (e) => {
    e.preventDefault();
    await axios.patch(
      `${baseUrl}/api/v1/owner/visit/${targetInfoId}/`,
      {},
      {
        headers: { Authorization: `JWT ${localStorage.getItem("access")}` },
      }
    )
    setShowModal(false)
  } */

  const PointChangeModal = ({ name, point }) => {
    return (
      <>
        <div
          className="inset-0 flex justify-center items-center"
          onClick={closeModal}
          style={{ position: "fixed", background: "rgba(0, 0, 0, 0.4)" }}
        ></div>
        <div
          className="bg-white border rounded-md py-6 px-12 text-center shadow-2xl bg-gray-100 z-100"
          style={{ position: "fixed", top: "50%", left: "40%" }}
        >
          <p className="font-bold text-2xl text-gray-700 mb-6">ポイント変更</p>
          {/* <button className="inline-block bg-pink-600 text-white rounded-md px-4" onClick={handleVisit}>来店</button> */}
          <p>{name}</p>
          <div className="mt-6">
            <p className="text-left pl-2 text-gray-500">{beforePoint}</p>
            <p className="text-left pl-2">⬇︎</p>
            <input
              type="number"
              value={point}
              className="border px-2 rounded-md mb-4"
              disabled
            ></input>
            <button
              onClick={handleInc}
              className="h-full w-8 bg-gray-300 text-2xl rounded-lg inline-block mx-2"
            >
              +
            </button>
            <button
              onClick={handleDec}
              className="h-full w-8 bg-gray-300 text-2xl rounded-lg inline-block"
            >
              -
            </button>
          </div>
          <button
            className="bg-indigo-600 text-white rounded-md px-4"
            onClick={handlePoint}
          >
            実行
          </button>
        </div>
      </>
    );
  };

  const tableItem = users.map((item) => {
    console.log(item);
    const {
      id,
      email,
      first_name,
      family_name,
      birth_date,
      address_prefecture,
      address_city,
      hear_from,
      introduced,
      phone_number,
      hope_rate,
      point,
      visit_count,
      continuous_visit_count,
      first_visit,
      previous_visit,
      last_visit,
    } = item;
    return (
      <tr key={email}>
        <td>{`${family_name} ${first_name}`}</td>
        <td>{email}</td>
        <td className="text-right">
          {point || 0}
          <button className="ml-4" value={email} onClick={handleModal}>
            <img src="pencil.svg" width={16} height={16} />
          </button>
        </td>
        <td>
          {first_visit &&
            `${new Date(first_visit).getFullYear()}-${
              new Date(first_visit).getMonth() + 1
            }-${new Date(first_visit).getDate()}`}
        </td>
        <td>
          {previous_visit &&
            `${new Date(item.previous_visit).getFullYear()}-${
              new Date(item.previous_visit).getMonth() + 1
            }-${new Date(item.previous_visit).getDate()}`}
        </td>
        <td>
          {last_visit &&
            `${new Date(item.last_visit).getFullYear()}-${
              new Date(item.last_visit).getMonth() + 1
            }-${new Date(item.last_visit).getDate()}`}
        </td>
        <td className=" text-right">{visit_count || 0}</td>
        <td className=" text-right">{continuous_visit_count || 0}</td>
        <td>{phone_number || "-"}</td>
        <td>{birth_date || "-"}</td>
        <td>{address_prefecture || "-"}</td>
        <td>{address_city || "-"}</td>
        <td>{hear_from || "-"}</td>
        <td>{introduced || "-"}</td>
        <td>{hope_rate || "-"}</td>
      </tr>
    );
  });

  return (
    <div>
      {/* {showModal && <PointChangeModal name={targetUser} point={targetPoint} />} */}
      <Modal
        centered
        withCloseButton={false}
        opened={showModal}
        onClose={() => setShowModal(false)}
      >
        <div className="flex items-center flex-col">
          <p className="font-bold text-2xl text-gray-700 mb-6">ポイント変更</p>
          <p>{targetUser}</p>
          <div className="mt-6">
            <input
              type="number"
              value={targetPoint}
              className="border px-2 rounded-md mb-4"
              disabled
            ></input>
            <button
              onClick={handleInc}
              className="h-full w-8 bg-gray-300 text-2xl rounded-lg inline-block mx-2"
            >
              +
            </button>
            <button
              onClick={handleDec}
              className="h-full w-8 bg-gray-300 text-2xl rounded-lg inline-block"
            >
              -
            </button>
          </div>
          <div className="flex justify-center w-full">
            <Button
              variant="outline"
              className="w-1/3 mr-4"
              onClick={handlePoint}
            >
              キャンセル
            </Button>
            <Button className="w-1/3" onClick={handlePoint}>
              確定
            </Button>
          </div>
        </div>
      </Modal>
      <div>ユーザ数: {users.length}</div>
      <Table
        highlightOnHover
        // className="block overflow-x-scroll whitespace-nowrap w-full"
      >
        <thead>
          <tr>
            <th className="px-4 py-2">顧客名</th>
            <th className="px-4 py-2">メールアドレス</th>
            <th className="px-8 py-2">保有Pt</th>
            <th className="px-4 py-2">初回来店日</th>
            <th className="px-4 py-2">前回来店日</th>
            <th className="px-4 py-2">最終来店日</th>
            <th className="px-4 py-2">来店回数</th>
            <th className="px-4 py-2">連続来店回数</th>
            <th className="px-4 py-2">電話番号</th>
            <th className="px-4 py-2">誕生日</th>
            <th className="px-4 py-2">住所（都道府県）</th>
            <th className="px-4 py-2">住所（市区町村）</th>
            <th className="px-4 py-2">来店きっかけ</th>
            <th className="px-4 py-2">紹介者</th>
            <th className="px-4 py-2">希望レート</th>
          </tr>
        </thead>
        <tbody>{tableItem}</tbody>
      </Table>
    </div>
  );
};
