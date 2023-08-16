import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import Login from "./components/pages/Login";
import MarlbruhShell from "./components/shell/MarlbruhShell";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";

function App() {
  const [authToken] = useLocalStorage({
    key: "marlbruh-auth",
  });
  // should check that auth is valid

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

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
        {authToken ? <MarlbruhShell /> : <Login />}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
