import { useState } from "react";
import { Table, LoadingOverlay } from "@mantine/core";
import { PencilAltIcon } from "@heroicons/react/outline";
import dayjs from "dayjs";
import { PointChangeModal } from "src/components/PointChangeModal";

export const CustomerTable = ({ userList, setUserList, isLoading }) => {
  const [showModal, setShowModal] = useState(false);
  const [targetUser, setTargetUser] = useState({});

  const handleModal = (e, item) => {
    // ポイント編集モーダル表示
    e.preventDefault();
    setTargetUser(item);
    setShowModal(true);
  };

  const tableItem = userList.map((item) => {
    const {
      id,
      email,
      firstName,
      familyName,
      birthDate,
      addressPrefecture,
      addressCity,
      hearFrom,
      introduced,
      phoneNumber,
      hopeRate,
      point,
      visitCount,
      continuousVisitCount,
      firstVisit,
      previousVisit,
      lastVisit,
    } = item;
    return (
      <tr key={id}>
        <td>{`${familyName} ${firstName}`}</td>
        <td>{email}</td>
        <td className="text-right">
          {point || 0}
          <button
            className="ml-1"
            value={email}
            onClick={(e) => handleModal(e, item)}
          >
            <PencilAltIcon className="h-4 w-4 text-amber-600" />
          </button>
        </td>
        <td>{firstVisit ? dayjs(firstVisit).format("YYYY/MM/DD") : "-"}</td>
        <td>
          {previousVisit ? dayjs(previousVisit).format("YYYY/MM/DD") : "-"}
        </td>
        <td>{lastVisit ? dayjs(lastVisit).format("YYYY/MM/DD") : "-"}</td>
        <td className=" text-right">{visitCount || 0}</td>
        <td className=" text-right">{continuousVisitCount || 0}</td>
        <td>{phoneNumber || "-"}</td>
        <td>{birthDate ? dayjs(birthDate).format("YYYY/MM/DD") : "-"}</td>
        <td>{addressPrefecture || "-"}</td>
        <td>{addressCity || "-"}</td>
        <td>{hearFrom || "-"}</td>
        <td>{introduced || "-"}</td>
        <td>{hopeRate || "-"}</td>
      </tr>
    );
  });

  return (
    <div>
      <PointChangeModal
        userList={userList}
        setUserList={setUserList}
        showModal={showModal}
        setShowModal={setShowModal}
        targetUser={targetUser}
        setTargetUser={setTargetUser}
      />
      <div className="relative">
        <LoadingOverlay visible={isLoading} />
        <div className="text-slate-500">顧客数: {userList.length}</div>
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
    </div>
  );
};
