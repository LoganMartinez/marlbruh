import { ActionIcon, AppShell, Avatar, ColorScheme, ColorSchemeProvider, Group, Header, MantineProvider, Navbar, Text, Title } from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import NavLinks from "./NavLinks";
import { IconHome } from "@tabler/icons-react";


const MarlbruhShell = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  
  useHotkeys([['mod+J', () => toggleColorScheme()]]);
  
  return ( 
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme: colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <AppShell
          navbar={
            <Navbar
              width={ { base: 80 }}
              p={"sm"}
            >
              <NavLinks direction="column"/>
            </Navbar> 
          }
          header={
            <Header height={70}>
              <Group position="apart" p="sm">
                <Group position="center">
                  <IconHome size="2rem"/>
                  <Title order={1}>Marlbruh</Title>
                </Group>
                
                <ActionIcon variant="unstyled">
                  <Avatar src={null} color="blue"/>
                </ActionIcon>
                
              </Group>
            </Header>
          }
          styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme === 'dark' ? 
              theme.colors.dark[8] : 
              theme.colors.gray[0] 
            },
          })}
        >
          <Text>Website goes here</Text>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
  
export default MarlbruhShell;