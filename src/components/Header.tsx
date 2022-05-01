import { useState } from "react";
import {
  Header as MantineHeader,
  MediaQuery,
  Burger,
  Button,
  useMantineTheme,
} from "@mantine/core";
import dynamic from "next/dynamic";
export const Header = ({ opened, setOpened }) => {
  const theme = useMantineTheme();
  const [openQrReader, setOpenQrReader] = useState(false);

  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem("access");
    window.location.href = "/signin";
  };

  const QrReader = dynamic(() => import("../components/QrRead"), {
    ssr: false,
  });

  const openCamera = () => {
    setOpenQrReader(!openQrReader);
  };

  return (
    <MantineHeader height={70} p="md">
      {openQrReader && (
        <QrReader isOpened={openQrReader} setIsOpened={setOpenQrReader} />
      )}
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center">
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          </MediaQuery>
          <div className="text-4xl text-cyan-800 font-semibold font-serif">
            WIN'S<span className="text-xl text-cyan-700 ml-4">管理者用</span>
          </div>
        </div>
        <div className="inline-block">
          <Button
            onClick={openCamera}
            className="bg-cyan-600 mr-4 hover:bg-cyan-500"
          >
            QR読取
          </Button>
          <Button variant="outline" color="red" onClick={logout}>
            ログアウト
          </Button>
        </div>
      </div>
    </MantineHeader>
  );
};
