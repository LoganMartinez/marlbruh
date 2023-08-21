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
import { stringToIcon } from "../../../utilities/helperFunctions";
import { IconEdit } from "@tabler/icons-react";
import { API_URL, profileColors } from "../../../utilities/constants";
import ChoreEditModal from "./ChoreEditModal";

type Props = {
  chore: Chore;
  setChoresUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChoreComponent = ({ chore, setChoresUpdated }: Props) => {
  const [deleteModalOpened, deleteModalHandlers] = useDisclosure(false);
  const [editModalOpened, editModalHandlers] = useDisclosure(false);

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

              <Title order={2}>{chore.name}</Title>
            </div>
            <div>
              {chore.user ? (
                <Text>
                  Assigned to:{" "}
                  {
                    <Group spacing="xs">
                      <Avatar
                        size="sm"
                        src={`${API_URL}${chore.user.profilePic}`}
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
            </div>
          </Stack>
        </Container>
      </Box>

      {/* <Card p="xl">
        
        <Card.Section>
          <Group position="apart" noWrap align="flex-start">
            {stringToIcon(chore.icon)}

            <Group position="right" spacing="xs" noWrap>
              <ActionIcon onClick={editModalHandlers.open}>
                <IconEdit size="1rem" />
              </ActionIcon>
              <CloseButton onClick={deleteModalHandlers.open} />
            </Group>
          </Group>

          <Title order={2}>{chore.name}</Title>
        </Card.Section>
        <Card.Section>
          {chore.user ? (
            <Text>
              Assigned to:{" "}
              {
                <Group spacing="xs">
                  <Avatar
                    size="sm"
                    src={`${API_URL}${chore.user.profilePic}`}
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
        </Card.Section>
      </Card> */}
    </>
  );
};

export default ChoreComponent;
