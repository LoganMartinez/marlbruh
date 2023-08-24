import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Container,
  Group,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import {
  profileColors,
  profileColorsSolid,
} from "../../../utilities/constants";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useAuth } from "../../../authentication/AuthContext";
import { likePiclePost } from "../../../api/apiCalls";
import { AxiosError } from "axios";
import { errorNotification } from "../../../utilities/helperFunctions";

type Props = {
  post: PiclePost;
  setPostsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

const PiclePost = ({ post, setPostsUpdated }: Props) => {
  const auth = useAuth();

  const toggleLike = () => {
    likePiclePost(post.id, auth.authToken)
      .then(() => {
        setPostsUpdated(true);
      })
      .catch((err: AxiosError) => {
        errorNotification(err.message);
      });
  };
  return (
    <>
      <Box
        sx={(theme) => ({
          backgroundColor: profileColors[post.author.profileColor],
          borderRadius: theme.radius.lg,
        })}
      >
        <Container p="md">
          <Stack>
            <Image radius="xl" src={post.content} />
            <Group position="apart" noWrap align="flex-start" spacing="xs">
              <Box
                sx={(theme) => ({
                  backgroundColor: profileColors[post.author.profileColor],
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
                          src={post.author.profilePic}
                          radius="xl"
                          color="blue"
                          size="sm"
                        />
                        <Text>{post.author.username}</Text>
                      </Group>
                    </Button>
                    <Text>{post.caption}</Text>
                  </Stack>
                </Container>
              </Box>
              <Stack spacing={0} align="center">
                <ActionIcon onClick={toggleLike}>
                  {post.likes.some(
                    (user) => user.userId === auth.currentUser.userId
                  ) ? (
                    <Box
                      style={{
                        color:
                          profileColorsSolid[auth.currentUser.profileColor],
                      }}
                    >
                      <IconHeartFilled />
                    </Box>
                  ) : (
                    <IconHeart />
                  )}
                </ActionIcon>
                <Text>{post.likes.length}</Text>
              </Stack>
            </Group>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default PiclePost;
