import {
  Box,
  CloseButton,
  Container,
  Group,
  ScrollArea,
  Stack,
  Title,
} from "@mantine/core";
import { profileColors } from "../../../utilities/constants";
import UserHandle from "../../reusableComponents/UserHandle";

type Props = {
  height: number;
  post: PiclePost;
  setCurrentView: React.Dispatch<React.SetStateAction<PiclePostView>>;
};

const PicleLikeList = ({ post, height, setCurrentView }: Props) => {
  return (
    <Box
      w="100%"
      h={height}
      sx={(theme) => ({
        backgroundColor: profileColors[post.author.profileColor],
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
            {post.likes.map((user) => (
              <UserHandle user={user} key={user.userId} />
            ))}
          </Stack>
        </ScrollArea>
      </Container>
    </Box>
  );
};

export default PicleLikeList;
