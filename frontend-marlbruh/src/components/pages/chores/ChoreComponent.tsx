import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  CloseButton,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import DeleteChoreConfirmation from "./DeleteChoreConfimation";
import {
  errorNotification,
  stringToIcon,
  successNotification,
} from "../../../utilities/helperFunctions";
import { IconCheck, IconEdit, IconHourglassHigh } from "@tabler/icons-react";
import { profileColors } from "../../../utilities/constants";
import ChoreEditModal from "./ChoreEditModal";
import { updateChore } from "../../../api/apiCalls";
import { useAuth } from "../../../authentication/AuthContext";
import { AxiosError } from "axios";
import ConfettiExplosion from "react-confetti-explosion";
import { useState } from "react";

type Props = {
  chore: Chore;
  setChoresUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChoreComponent = ({ chore, setChoresUpdated }: Props) => {
  const auth = useAuth();
  const [deleteModalOpened, deleteModalHandlers] = useDisclosure(false);
  const [editModalOpened, editModalHandlers] = useDisclosure(false);
  const [isExploding, setIsExploding] = useState(false);

  const toggleChore = () => {
    updateChore(
      chore.id,
      auth.authToken,
      undefined,
      undefined,
      undefined,
      !chore.complete,
      undefined
    )
      .then(({ data: updatedChore }) => {
        if (updatedChore.complete) {
          setIsExploding(true);
          successNotification("Nice job!");
        }
        setChoresUpdated(true);
      })
      .catch((err: AxiosError) => errorNotification(err.message));
  };

  return (
    <>
      <DeleteChoreConfirmation
        chore={chore}
        opened={deleteModalOpened}
        openHandlers={deleteModalHandlers}
        setChoresUpdated={setChoresUpdated}
      />
      <ChoreEditModal
        chore={chore}
        opened={editModalOpened}
        openHandlers={editModalHandlers}
        setChoresUpdated={setChoresUpdated}
      />
      <Box
        sx={(theme) => ({
          background:
            chore.users.length > 1
              ? `linear-gradient(45deg, ${
                  profileColors[chore.users[0].profileColor]
                }, ${profileColors[chore.users[1].profileColor]})`
              : undefined,
          backgroundColor:
            chore.users.length === 1
              ? profileColors[chore.users[0].profileColor]
              : chore.users.length === 0
              ? theme.colors.dark[6]
              : undefined,
          borderRadius: theme.radius.lg,
        })}
      >
        <Container p="md">
          <Stack>
            <div>
              <Group position="apart" noWrap align="flex-start">
                {stringToIcon(chore.icon)}

                <Group position="right" spacing="xs" noWrap>
                  <ActionIcon onClick={editModalHandlers.open}>
                    <IconEdit size="1rem" />
                  </ActionIcon>
                  <CloseButton onClick={deleteModalHandlers.open} />
                </Group>
              </Group>

              <Title order={2} strikethrough={chore.complete}>
                {chore.name}
              </Title>
              {chore.description ? <Text>{chore.description}</Text> : <></>}
            </div>
            <Group position="apart" align="flex-start">
              {chore.users.length > 0 ? (
                <Stack spacing=".5rem">
                  <Text>Assigned to: </Text>
                  {chore.users.map((user, index) => (
                    <Box
                      key={index}
                      sx={(theme) => ({
                        backgroundColor: profileColors[user.profileColor],
                        borderRadius: theme.radius.lg,
                      })}
                    >
                      <Button
                        variant="unstyled"
                        p={0}
                        component="a"
                        href={`#/users/${user.username}`}
                      >
                        <Container p=".5rem">
                          <Group spacing="xs" noWrap>
                            <Avatar
                              size="sm"
                              src={user.profilePic}
                              radius="xl"
                              color="blue"
                            />
                            <Text>{user.username}</Text>
                          </Group>
                        </Container>
                      </Button>
                    </Box>
                  ))}
                </Stack>
              ) : (
                <Text>Not Assigned</Text>
              )}
              <Stack align="center" spacing="xs">
                <Text>Status</Text>
                {isExploding && <ConfettiExplosion />}
                <ActionIcon onClick={toggleChore}>
                  {chore.complete ? <IconCheck /> : <IconHourglassHigh />}
                </ActionIcon>
              </Stack>
            </Group>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default ChoreComponent;
