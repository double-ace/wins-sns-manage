import { useState } from "react";
import { AppShell, Navbar, useMantineTheme } from "@mantine/core";
import { Header } from "./Header";
import { NavMenu } from "src/components/NavMenu";

export const Layout = ({ children }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem("access");
    window.location.href = "/";
  };

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 150, lg: 150 }}
        >
          <NavMenu />
        </Navbar>
      }
      header={<Header opened={opened} setOpened={setOpened} />}
    >
      {children}
    </AppShell>
  );
};
