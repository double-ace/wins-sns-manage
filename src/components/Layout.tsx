import { useState } from "react";
import { AppShell, Navbar } from "@mantine/core";
import { Header } from "src/components/Header";
import { NavMenu } from "src/components/NavMenu";

export const Layout = ({ children }) => {
  const [opened, setOpened] = useState(false);

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
