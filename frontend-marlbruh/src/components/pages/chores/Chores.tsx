import {
  ActionIcon,
  Group,
  Loader,
  SimpleGrid,
  Space,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { getChores } from "../../../api/apiCalls";
import { useAuth } from "../../../authentication/AuthContext";
import ChoreComponent from "./ChoreComponent";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import ChoreCreationModal from "./ChoreCreationModal";

const Chores = () => {
  const auth = useAuth();
  const [choreCreationOpened, choreCreationHandlers] = useDisclosure(false);
  const [allChores, setAllChores] = useState(undefined as Chore[] | undefined);
  const [choresUpdated, setChoresUpdated] = useState(true);
  useEffect(() => {
    if (choresUpdated) {
      getChores(auth.authToken).then(({ data: chores }) => {
        setAllChores(chores);
      });
      setChoresUpdated(false);
    }
  }, [choresUpdated]);
  return (
    <>
      <ChoreCreationModal
        opened={choreCreationOpened}
        openHandlers={choreCreationHandlers}
        setChoresUpdated={setChoresUpdated}
      />
      <Group position="apart">
        <Text />
        <Group position="center">
          <ActionIcon onClick={() => choreCreationHandlers.open()}>
            <IconPlus />
          </ActionIcon>
        </Group>
      </Group>
      <Space h="xs" />

      {allChores ? (
        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: "62rem", cols: 3, spacing: "md" },
            { maxWidth: "48rem", cols: 2, spacing: "sm" },
            { maxWidth: "36rem", cols: 1, spacing: "sm" },
          ]}
        >
          {allChores.map((chore) => (
            <ChoreComponent chore={chore} key={chore.id} />
          ))}
        </SimpleGrid>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Chores;
