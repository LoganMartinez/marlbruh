import {
  ActionIcon,
  Group,
  Loader,
  Select,
  SimpleGrid,
  Space,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { getChores } from "../../../api/apiCalls";
import { useAuth } from "../../../authentication/AuthContext";
import ChoreComponent from "./ChoreComponent";
import { IconArrowBackUpDouble, IconPlus } from "@tabler/icons-react";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import ChoreCreationModal from "./ChoreCreationModal";
import { errorNotification } from "../../../utilities/helperFunctions";
import { AxiosError } from "axios";
import ChoresResetModal from "./ChoresResetModal";

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
  const windowWidth = useViewportSize().width;
  const [choreCreationOpened, choreCreationHandlers] = useDisclosure(false);
  const [choresResetOpened, choresResetHandlers] = useDisclosure(false);
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
      getChores(auth.authToken)
        .then(({ data: chores }) => {
          setAllChores(chores);
          changeFilter(chores);
        })
        .catch((err: AxiosError) => {
          errorNotification(err.message);
        })
        .finally(() => setChoresUpdated(false));
    }
  }, [choresUpdated]);

  const changeFilter = (chores: Chore[]) => {
    setFilteredChores(
      chores.filter((chore) => {
        const meFilterFail =
          filter.users === "me" &&
          chore.users.every(
            ({ username }) => username !== auth.currentUser.username
          );
        const unassignedFilterFail =
          filter.users === "unassigned" && chore.users.length > 0;
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
  };

  useEffect(() => {
    if (allChores) {
      changeFilter(allChores);
    }
  }, [filter]);

  return (
    <>
      <ChoreCreationModal
        opened={choreCreationOpened}
        openHandlers={choreCreationHandlers}
        setChoresUpdated={setChoresUpdated}
      />
      <ChoresResetModal
        opened={choresResetOpened}
        openHandlers={choresResetHandlers}
        chores={allChores || []}
        setChoresUpdated={setChoresUpdated}
      />
      <Group position="apart" noWrap align="flex-start">
        <Group position="left" noWrap={windowWidth >= 500} w="70%">
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
          <ActionIcon onClick={choresResetHandlers.open}>
            <IconArrowBackUpDouble />
          </ActionIcon>
          <ActionIcon onClick={choreCreationHandlers.open}>
            <IconPlus />
          </ActionIcon>
        </Group>
      </Group>
      <Space h="xs" />

      {choresUpdated ? (
        <Loader />
      ) : filteredChores && filteredChores.length > 0 ? (
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
