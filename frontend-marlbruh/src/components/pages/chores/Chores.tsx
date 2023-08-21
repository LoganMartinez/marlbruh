import {
  ActionIcon,
  Group,
  Select,
  SimpleGrid,
  Space,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { getChores } from "../../../api/apiCalls";
import { useAuth } from "../../../authentication/AuthContext";
import ChoreComponent from "./ChoreComponent";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import ChoreCreationModal from "./ChoreCreationModal";

const userFilterData = [
  { value: "all", label: "All users" },
  { value: "me", label: "My chores" },
  { value: "unassigned", label: "Unassigned" },
];

const statusFilterData = [
  { value: "all", label: "Any status" },
  { value: "incomplete", label: "Incomplete" },
  { value: "complete", label: "Complete" },
];

const Chores = () => {
  const auth = useAuth();
  const [choreCreationOpened, choreCreationHandlers] = useDisclosure(false);
  const [allChores, setAllChores] = useState(undefined as Chore[] | undefined);
  const [filteredChores, setFilteredChores] = useState([] as Chore[]);
  const [choresUpdated, setChoresUpdated] = useState(true);
  const [filter, setFilter] = useState({
    users: "all",
    completionStatus: "all",
  });

  // updated all chores
  useEffect(() => {
    if (choresUpdated) {
      getChores(auth.authToken).then(({ data: chores }) => {
        setAllChores(chores);
      });
      setChoresUpdated(false);
    }
  }, [choresUpdated]);

  // filter chores
  useEffect(() => {
    if (allChores) {
      setFilteredChores(
        allChores.filter((chore) => {
          const meFilterFail =
            filter.users === "me" &&
            (!chore.user || chore.user.username !== auth.currentUser.username);
          const unassignedFilterFail =
            filter.users === "unassigned" && chore.user;
          const incompleteFilterFail =
            filter.completionStatus === "incomplete" && chore.complete;
          const completeFilterFail =
            filter.completionStatus === "complete" && !chore.complete;
          return !(
            meFilterFail ||
            unassignedFilterFail ||
            incompleteFilterFail ||
            completeFilterFail
          );
        })
      );
    }
  }, [filter, allChores]);
  return (
    <>
      <ChoreCreationModal
        opened={choreCreationOpened}
        openHandlers={choreCreationHandlers}
        setChoresUpdated={setChoresUpdated}
      />
      <Group position="apart" noWrap>
        <Group position="left" noWrap w="70%">
          <Select
            data={userFilterData}
            value={filter.users}
            onChange={(value) => {
              if (value) {
                setFilter((prev) => ({ ...prev, users: value }));
              }
            }}
          />
          <Select
            data={statusFilterData}
            value={filter.completionStatus}
            onChange={(value) => {
              if (value) {
                setFilter((prev) => ({ ...prev, completionStatus: value }));
              }
            }}
          />
        </Group>

        <Group position="center">
          <ActionIcon onClick={() => choreCreationHandlers.open()}>
            <IconPlus />
          </ActionIcon>
        </Group>
      </Group>
      <Space h="xs" />

      {filteredChores && filteredChores.length > 0 ? (
        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: "62rem", cols: 3, spacing: "md" },
            { maxWidth: "48rem", cols: 2, spacing: "sm" },
            { maxWidth: "36rem", cols: 1, spacing: "sm" },
          ]}
        >
          {filteredChores.map((chore) => (
            <ChoreComponent
              chore={chore}
              key={chore.id}
              setChoresUpdated={setChoresUpdated}
            />
          ))}
        </SimpleGrid>
      ) : (
        <>
          <Title align="left">
            There are no chores that match that filtering
          </Title>
        </>
      )}
    </>
  );
};

export default Chores;
