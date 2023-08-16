import {
  ActionIcon,
  AppShell,
  Avatar,
  Group,
  Header,
  Navbar,
  Title,
} from "@mantine/core";
import NavLinks from "./NavLinks";
import { IconHome } from "@tabler/icons-react";
import MarlbruhRoutes from "../routing/MarlbruhRoutes";

const MarlbruhShell = () => {
  return (
    <AppShell
      navbar={
        <Navbar width={{ base: 80 }} p={"sm"}>
          <NavLinks direction="column" />
        </Navbar>
      }
      header={
        <Header height={70}>
          <Group position="apart" p="sm">
            <Group position="center">
              <IconHome size="2rem" />
              <Title order={1}>Marlbruh</Title>
            </Group>

            <ActionIcon variant="unstyled">
              <Avatar src={null} color="blue" />
            </ActionIcon>
          </Group>
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
      <MarlbruhRoutes />
    </AppShell>
  );
};

export default MarlbruhShell;
