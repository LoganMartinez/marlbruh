import { AppShell, Group, Header, Navbar, Title } from "@mantine/core";
import NavLinks from "./NavLinks";
import { IconHome } from "@tabler/icons-react";
import MarlbruhRoutes from "../routing/MarlbruhRoutes";
import ProfileMenu from "./ProfileMenu";
import { createContext, useContext, useState } from "react";

type ShellContextType = {
  shellEnabled: boolean;
  setShellEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShellContext = createContext<ShellContextType | undefined>(undefined);

const MarlbruhShell = () => {
  const [shellEnabled, setShellEnabled] = useState(true);
  const shellContextValue: ShellContextType = { shellEnabled, setShellEnabled };

  return (
    <ShellContext.Provider value={shellContextValue}>
      <AppShell
        navbar={
          shellEnabled ? (
            <Navbar width={{ base: 80 }} p={"sm"}>
              <NavLinks direction="column" />
            </Navbar>
          ) : (
            <></>
          )
        }
        header={
          shellEnabled ? (
            <Header height={70}>
              <Group position="apart" p="sm">
                <Group position="center">
                  <IconHome size="2rem" />
                  <Title order={1}>Marlbruh</Title>
                </Group>
                <ProfileMenu />
              </Group>
            </Header>
          ) : (
            <></>
          )
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
    </ShellContext.Provider>
  );
};

export function useShell() {
  const shell = useContext(ShellContext);
  if (!shell) {
    throw new Error("useShell must be used within MarlbruhShell");
  }
  return shell;
}

export default MarlbruhShell;
