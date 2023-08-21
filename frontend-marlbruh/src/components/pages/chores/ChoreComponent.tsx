import {
  ActionIcon,
  Avatar,
  Box,
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
      !chore.complete
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
          backgroundColor: chore.user
            ? profileColors[chore.user.profileColor]
            : theme.colors.dark[6],
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
            </div>
            <Group position="apart">
              {chore.user ? (
                <Text>
                  Assigned to:{" "}
                  {
                    <Group spacing="xs">
                      <Avatar
                        size="sm"
                        src={chore.user.profilePic}
                        radius="xl"
                      />
                      <a href={`#/users/${chore.user.username}`}>
                        {chore.user.username}
                      </a>
                    </Group>
                  }
                </Text>
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
