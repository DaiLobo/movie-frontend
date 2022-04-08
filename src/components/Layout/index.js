import { Outlet } from "react-router-dom";
import { AppShell, Navbar, Header} from "@mantine/core";
import MainLinks from "./MainLinks";

const Layout = () => {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          <Navbar.Section grow mt="xs">
            <MainLinks />
          </Navbar.Section>
          <Navbar.Section>{/* <User /> */}</Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60}>
          {/*  Header Content */}
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Outlet />
    </AppShell>
  );
};

export default Layout;