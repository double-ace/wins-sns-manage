import { useState } from "react";
import { Button, Modal } from "@mantine/core";

export const ConfirmModal = ({ showModal, setShowModal, msg, confirmFunc }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    await confirmFunc();
    setIsLoading(false);
  };
  return (
    <Modal
      withCloseButton={false}
      centered
      opened={showModal}
      onClose={() => setShowModal(false)}
    >
      <div className="text-center">
        <p className="my-8">{msg}</p>
        <Button
          size="md"
          radius="xl"
          variant="outline"
          color="pink"
          className="px-8"
          onClick={() => setShowModal(false)}
        >
          取消
        </Button>
        <Button
          loading={isLoading}
          size="md"
          radius="xl"
          color="cyan"
          className="ml-4 px-8 bg-cyan-600 hover:bg-cyan-500"
          onClick={handleConfirm}
        >
          確定
        </Button>
      </div>
    </Modal>
  );
};
