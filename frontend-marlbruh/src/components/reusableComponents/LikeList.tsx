import {
  Box,
  CloseButton,
  Container,
  Group,
  ScrollArea,
  Stack,
  Title,
} from "@mantine/core";
import UserHandle from "./UserHandle";

type Props = {
  height: number;
  likes: User[];
  setCurrentView: React.Dispatch<React.SetStateAction<PiclePostView>>;
  backgroundColor: string;
};

const LikeList = ({
  height,
  likes,
  setCurrentView,
  backgroundColor,
}: Props) => {
  return (
    <Box
      w="100%"
      h={height}
      sx={(theme) => ({
        backgroundColor: backgroundColor,
        borderRadius: theme.radius.lg,
      })}
    >
      <Container p="md">
        <Group position="apart">
          <Title>Likes</Title>
          <CloseButton size="md" onClick={() => setCurrentView("post")} />
        </Group>
        <ScrollArea h={height - 96}>
          <Stack>
            {likes.map((user) => (
              <UserHandle user={user} key={user.userId} />
            ))}
          </Stack>
        </ScrollArea>
      </Container>
    </Box>
  );
};

export default LikeList;
