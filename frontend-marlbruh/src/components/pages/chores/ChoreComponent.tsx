import {
  ActionIcon,
  Avatar,
  Card,
  CloseButton,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import DeleteChoreConfirmation from "./DeleteChoreConfimation";
import { stringToIcon } from "../../../utilities/helperFunctions";
import { IconEdit } from "@tabler/icons-react";
import { API_URL } from "../../../utilities/constants";

type Props = {
  chore: Chore;
};

const ChoreComponent = ({ chore }: Props) => {
  const [deleteModalOpened, deleteModalHandlers] = useDisclosure(false);

  return (
    <>
      <DeleteChoreConfirmation
        chore={chore}
        opened={deleteModalOpened}
        openHandlers={deleteModalHandlers}
      />
      <Card p="xl">
        <Card.Section>
          <Group position="apart" noWrap align="flex-start">
            {stringToIcon(chore.icon)}

            <Group position="right" spacing="xs" noWrap>
              <ActionIcon>
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
      </Card>
    </>
  );
};

export default ChoreComponent;
