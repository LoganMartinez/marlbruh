import {
  Avatar,
  Box,
  Button,
  Container,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { profileColors } from "../../../utilities/constants";

type Props = {
  user: User;
  content: string;
};

const PicleUserText = ({ user, content }: Props) => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: profileColors[user.profileColor],
        borderRadius: theme.radius.lg,
      })}
      w="100%"
      pt="xs"
      pb="xs"
    >
      <Container>
        <Stack align="flex-start" spacing={0}>
          <Button variant="unstyled" p={0}>
            <Group spacing=".2rem">
              <Avatar
                src={user.profilePic}
                radius="xl"
                color="blue"
                size="sm"
              />
              <Text>{user.username}</Text>
            </Group>
          </Button>
          <Text>{content}</Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default PicleUserText;
