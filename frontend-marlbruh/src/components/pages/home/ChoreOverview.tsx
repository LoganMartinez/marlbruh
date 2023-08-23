import {
  Group,
  ScrollArea,
  Space,
  Stack,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { getChores } from "../../../api/apiCalls";
import { useAuth } from "../../../authentication/AuthContext";
import { AxiosError } from "axios";
import { errorNotification } from "../../../utilities/helperFunctions";
import SimpleChoreComponent from "../chores/SimpleChoreComponent";

type getChoresReturn = {
  data: Chore[];
};

const ChoreOverview = () => {
  const auth = useAuth();
  const [userChores, setUserChores] = useState([] as Chore[]);

  useEffect(() => {
    getChores(auth.authToken)
      .then(({ data: chores }: getChoresReturn) => {
        const filteredChores = chores.filter((chore) =>
          chore.users.some(
            (user) => user.username === auth.currentUser.username
          )
        );
        setUserChores(filteredChores);
      })
      .catch((err: AxiosError) => errorNotification(err.message));
  }, []);

  return (
    <>
      {userChores.length === 0 ? (
        <Title order={3}>You finished all your chores! </Title>
      ) : (
        <Stack spacing=".1rem">
          <Title order={3}>Your Unfinished Chores:</Title>
          <ScrollArea type="hover">
            <Group noWrap spacing="xs" position="left">
              {userChores.map((chore) => (
                <UnstyledButton
                  p="0"
                  component="a"
                  href="#/chores"
                  key={chore.id}
                >
                  <SimpleChoreComponent chore={chore} />
                </UnstyledButton>
              ))}
            </Group>
            <Space h="md" />
          </ScrollArea>
        </Stack>
      )}
    </>
  );
};

export default ChoreOverview;
