import { Group, ScrollArea, Stack, Title } from "@mantine/core";
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
        console.log(chores);
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
        <Stack>
          <div>
            <Title order={3}>Your Unfinished Chores:</Title>
            <a href="#/chores">Go to chore page</a>
          </div>
          <ScrollArea type="hover">
            <Group noWrap spacing="xs" position="left">
              {userChores.map((chore) => (
                <SimpleChoreComponent chore={chore} key={chore.id} />
              ))}
            </Group>
          </ScrollArea>
        </Stack>
      )}
    </>
  );
};

export default ChoreOverview;
