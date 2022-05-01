import { useState, useEffect } from "react";
import { Table, LoadingOverlay } from "@mantine/core";
import { requestHttpPatch } from "src/utils/requestBase";
import dayjs from "dayjs";

type Visitor = {
  id: string;
  email: string;
  family_name: string;
  first_name: string;
  point: number;
  visited_date: string;
  first_visit: string;
  last_visit: string;
  previous_visit: string;
};

export const VisitorTable = ({ visitorList, isLoading, type }) => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [targetEmail, setTargetEmail] = useState("");
  const [targetInfoId, setTargetInfoId] = useState("");
  const [targetUser, setTargetUser] = useState("");
  const [targetPoint, setTargetPoint] = useState(0);
  const [beforePoint, setBeforePoint] = useState(0);

  const handleModal = (e) => {
    // ポイント編集モーダル表示
    setTargetEmail(e.currentTarget.value);
    users.forEach((item) => {
      if (e.currentTarget.value === item.email) {
        setTargetUser(`${item.last_name} ${item.first_name}`);
        setTargetInfoId(item.info_id);
        setBeforePoint(item.point);
        setTargetPoint(item.point);
        console.log(typeof item.point);
      }
    });
    setShowModal(true);
  };

  const handleInc = () => {
    setTargetPoint(Number(targetPoint) + 100);
  };

  const handleDec = () => {
    setTargetPoint(targetPoint - 100);
  };

  const handlePoint = async () => {
    // ポイント確定
    await requestHttpPatch(`/owner/point-change/${targetInfoId}/`, {
      email: targetEmail,
      point: targetPoint,
    });
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const changeTwoDigit = (minute) => {
    const shapedMinute = new Date(minute).getMinutes().toString();
    return shapedMinute.length == 2 ? shapedMinute : `0${shapedMinute}`;
  };

  const PointChangeModal = ({ name, point }) => {
    return (
      <>
        <div
          className="w-full h-full z-1"
          onClick={closeModal}
          style={{ position: "fixed", background: "rgba(0, 0, 0, 0.4)" }}
        ></div>
        <div
          className="bg-white border rounded-md py-6 px-12 text-center shadow-2xl bg-gray-100 z-100"
          style={{ position: "fixed", top: "50%", left: "40%" }}
        >
          <p className="font-bold text-2xl text-gray-700 mb-6">ポイント変更</p>
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

  const tableItem = visitorList.map((item: Visitor) => {
    console.log(item);
    const {
      id,
      email,
      family_name,
      first_name,
      point,
      visited_date,
      first_visit,
      last_visit,
      previous_visit,
    } = item;
    return (
      <tr key={id}>
        <td>{`${family_name} ${first_name}`}</td>
        <td>{email}</td>
        <td className="text-right">
          {point ? point : 0}
          <button className="ml-4" value={email} onClick={handleModal}>
            <img src="/pencil.svg" width={20} height={20} />
          </button>
        </td>
        <td>{visited_date ? dayjs(visited_date).format("HH:mm") : "-"}</td>
        <td>{first_visit ? dayjs(first_visit).format("YYYY/MM/DD") : "-"}</td>
        {type === "today" ? (
          <td>
            {previous_visit ? dayjs(previous_visit).format("YYYY/MM/DD") : "-"}
          </td>
        ) : (
          <td>{last_visit ? dayjs(last_visit).format("YYYY/MM/DD") : "-"}</td>
        )}
      </tr>
    );
  });

  return (
    <div>
      {showModal && <PointChangeModal name={targetUser} point={targetPoint} />}
      <div className="relative">
        <LoadingOverlay visible={isLoading} />
        <Table highlightOnHover captionSide="bottom">
          {!isLoading && !tableItem.length && (
            <caption>来客はありません</caption>
          )}
          <thead>
            <tr>
              <th className="px-4 py-2">顧客名</th>
              <th className="px-4 py-2">メールアドレス</th>
              <th className="px-8 py-2">保有ポイント</th>
              <th className="px-4 py-2">来店時間</th>
              <th className="px-r py-2">初回来店日</th>
              <th className="px-r py-2">
                {type === "today" ? "前回来店日" : "最終来店日"}
              </th>
            </tr>
          </thead>
          <tbody>{tableItem}</tbody>
        </Table>
      </div>
    </div>
  );
};
