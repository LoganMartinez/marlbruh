import {
  Loader,
  SimpleGrid,
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
  const [choresLoading, setChoresLoading] = useState(true);

  useEffect(() => {
    getChores(auth.authToken)
      .then(({ data: chores }: getChoresReturn) => {
        const filteredChores = chores.filter(
          (chore) =>
            !chore.complete &&
            chore.users.some(
              (user) => user.username === auth.currentUser.username
            )
        );
        setUserChores(filteredChores);
        setChoresLoading(false);
      })
      .catch((err: AxiosError) => errorNotification(err.message));
  }, []);

  return (
    <>
      <Title>Chores</Title>

      {choresLoading ? (
        <Loader />
      ) : userChores.length === 0 ? (
        <Title order={3}>You finished all your chores! </Title>
      ) : (
        <Stack spacing=".1rem">
          <Title order={3}>Your Unfinished Chores:</Title>
          <SimpleGrid
            cols={3}
            breakpoints={[
              { maxWidth: "62rem", cols: 3, spacing: "md" },
              { maxWidth: "48rem", cols: 2, spacing: "sm" },
              { maxWidth: "36rem", cols: 1, spacing: "sm" },
            ]}
            spacing={"xs"}
          >
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
          </SimpleGrid>
        </Stack>
      )}
    </>
  );
};

export default ChoreOverview;
