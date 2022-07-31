import { Modal, Button } from "@mantine/core";
import { PlusSmIcon, MinusSmIcon } from "@heroicons/react/outline";
import { requestHttpPatch } from "src/utils/requestBase";

export const PointChangeModal = ({
  userList,
  setUserList,
  showModal,
  setShowModal,
  targetUser,
  setTargetUser,
}) => {
  const handleIncDec = (e, type: "inc" | "dec") => {
    e.preventDefault();
    setTargetUser((prev) => ({
      ...prev,
      point:
        type === "inc"
          ? Number(targetUser.point) + 100
          : Number(targetUser.point) - 100,
    }));
  };

  const handlePointChange = async (e) => {
    // ポイント確定
    e.preventDefault();
    await requestHttpPatch(`/owner/point-change/${targetUser.id}/`, {
      point: targetUser.point,
    });
    console.log(userList);
    const newList = userList.map((item) => {
      if (item.email !== targetUser.email) {
        return item;
      }
      return { ...item, point: targetUser.point };
    });
    setUserList([...newList]);
    setShowModal(false);
  };
  return (
    <Modal
      centered
      withCloseButton={false}
      opened={showModal}
      onClose={() => setShowModal(false)}
    >
      <div className="flex items-center flex-col">
        <p className="font-bold text-2xl text-cyan-500 mb-6">ポイント変更</p>
        <p>{`${targetUser.familyName} ${targetUser.firstName}`}</p>
        <div className="mt-6">
          <input
            type="number"
            value={targetUser.point}
            className="border px-2 rounded-md mb-4"
            disabled
          ></input>
          <button
            onClick={(e) => handleIncDec(e, "inc")}
            className="p-2 bg-gray-300 text-2xl rounded-lg inline-block mx-2"
          >
            <PlusSmIcon className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => handleIncDec(e, "dec")}
            className="p-2 bg-gray-300 text-2xl rounded-lg inline-block"
          >
            <MinusSmIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="flex justify-center w-full">
          <Button
            variant="outline"
            color="pink"
            className="w-1/3 mr-4"
            onClick={() => setShowModal(false)}
          >
            キャンセル
          </Button>
          <Button
            className="w-1/3 bg-cyan-500 hover:bg-cyan-400"
            onClick={handlePointChange}
          >
            確定
          </Button>
        </div>
      </div>
    </Modal>
  );
};
