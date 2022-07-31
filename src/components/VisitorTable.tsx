import { useState } from "react";
import { Table, LoadingOverlay } from "@mantine/core";
import { PencilAltIcon } from "@heroicons/react/outline";
import { PointChangeModal } from "src/components/PointChangeModal";
import dayjs from "dayjs";

type Visitor = {
  id: string;
  email: string;
  familyName: string;
  firstName: string;
  infoId: string;
  point: number;
  visitedDate: string;
  firstVisit: string;
  lastVisit: string;
  previousVisit: string;
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
      familyName,
      firstName,
      point,
      visitedDate,
      firstVisit,
      lastVisit,
      previousVisit,
    } = item;
    return (
      <tr key={id}>
        <td>{`${familyName} ${firstName}`}</td>
        <td>{email}</td>
        <td className="text-right">
          {point ? point : 0}
          <button
            className="ml-1"
            value={email}
            onClick={(e) => handleModal(e, item)}
          >
            <PencilAltIcon className="h-4 w-4 text-amber-600" />
          </button>
        </td>
        <td>{visitedDate ? dayjs(visitedDate).format("HH:mm") : "-"}</td>
        <td>{firstVisit ? dayjs(firstVisit).format("YYYY/MM/DD") : "-"}</td>
        {type === "today" ? (
          <td>
            {previousVisit ? dayjs(previousVisit).format("YYYY/MM/DD") : "-"}
          </td>
        ) : (
          <td>{lastVisit ? dayjs(lastVisit).format("YYYY/MM/DD") : "-"}</td>
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
