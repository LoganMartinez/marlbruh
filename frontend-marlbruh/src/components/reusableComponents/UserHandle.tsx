import { Avatar, Box, Button, Container, Group, Text } from "@mantine/core";
import { profileColors } from "../../utilities/constants";

type Props = {
  user: User;
};

const UserHandle = ({ user }: Props) => {
  return (
    <Box
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
            <Avatar size="sm" src={user.profilePic} radius="xl" color="blue" />
            <Text>{user.username}</Text>
          </Group>
        </Container>
      </Button>
    </Box>
  );
};

export default UserHandle;
