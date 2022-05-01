import { useState } from "react";
import { Table, LoadingOverlay } from "@mantine/core";
import { PointChangeModal } from "src/components/PointChangeModal";
import dayjs from "dayjs";

type Visitor = {
  id: string;
  email: string;
  family_name: string;
  first_name: string;
  info_id: string;
  point: number;
  visited_date: string;
  first_visit: string;
  last_visit: string;
  previous_visit: string;
};

export const VisitorTable = ({
  visitorList,
  setVisitorList,
  isLoading,
  type,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [targetUser, setTargetUser] = useState({});

  const handleModal = (e, item) => {
    // ポイント編集モーダル表示
    setTargetUser(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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
          <button
            className="ml-4"
            value={email}
            onClick={(e) => handleModal(e, item)}
          >
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
      <PointChangeModal
        userList={visitorList}
        setUserList={setVisitorList}
        showModal={showModal}
        setShowModal={setShowModal}
        targetUser={targetUser}
        setTargetUser={setTargetUser}
      />
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
