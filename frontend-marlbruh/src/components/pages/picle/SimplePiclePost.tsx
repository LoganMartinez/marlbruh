import { Box, Container, Group, Image, Stack, Text } from "@mantine/core";
import {
  profileColors,
  profileColorsSolid,
} from "../../../utilities/constants";
import UserHandle from "../../reusableComponents/UserHandle";
import {
  IconHeart,
  IconHeartFilled,
  IconMessageCircle2,
} from "@tabler/icons-react";
import { getComments } from "../../../api/apiCalls";
import { useEffect, useState } from "react";
import { useAuth } from "../../../authentication/AuthContext";
import { AxiosError } from "axios";
import { errorNotification } from "../../../utilities/helperFunctions";
import { useNavigate } from "react-router-dom";

type Props = {
  post: PiclePost;
};

const SimplePiclePost = ({ post }: Props) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getComments(post.id, auth.authToken)
      .then(({ data: comments }) => {
        setComments(comments.reverse());
      })
      .catch((err: AxiosError) => {
        errorNotification(err.message);
      });
  }, []);

  return (
    <>
      <Box
        sx={(theme) => ({
          backgroundColor: profileColors[post.author.profileColor],
          borderRadius: theme.radius.lg,
        })}
        onClick={() => navigate("/pickle")}
        maw={400}
      >
        <Container p="md">
          <Stack>
            <Group position="apart">
              <UserHandle user={post.author} />
              <Group spacing="xs" align="flex-start">
                {post.likes.some(
                  (user) => user.userId === auth.currentUser.userId
                ) ? (
                  <Box
                    style={{
                      color: profileColorsSolid[auth.currentUser.profileColor],
                    }}
                  >
                    <IconHeartFilled />
                  </Box>
                ) : (
                  <IconHeart />
                )}
                <Text>{post.likes.length}</Text>
                <IconMessageCircle2 />
                <Text>{comments.length}</Text>
              </Group>
            </Group>

            <Image src={post.content} radius="xl" />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default SimplePiclePost;
