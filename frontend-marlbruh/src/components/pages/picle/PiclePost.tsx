import {
  ActionIcon,
  Box,
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
import {
  IconHeart,
  IconHeartFilled,
  IconMessageCircle2,
} from "@tabler/icons-react";
import { useAuth } from "../../../authentication/AuthContext";
import { getComments, likePiclePost } from "../../../api/apiCalls";
import { AxiosError } from "axios";
import { errorNotification } from "../../../utilities/helperFunctions";
import { useEffect, useState } from "react";
import { useDisclosure, useElementSize } from "@mantine/hooks";
import PicleCommentView from "./PicleCommentView";
import PicleUserText from "./PicleUserText";

type Props = {
  post: PiclePost;
  postsUpdated: boolean;
  setPostsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

const PiclePost = ({ post, postsUpdated, setPostsUpdated }: Props) => {
  const auth = useAuth();
  const [comments, setComments] = useState([] as PicleComment[]);
  const [commentsOpened, commentsOpenHandlers] = useDisclosure(false);
  const [commentsUpdated, setCommentsUpdated] = useState(true);
  const { ref: sizeRef, height: postHeight } = useElementSize();

  const toggleLike = () => {
    likePiclePost(post.id, auth.authToken)
      .then(() => {
        setPostsUpdated(true);
      })
      .catch((err: AxiosError) => {
        errorNotification(err.message);
      });
  };

  useEffect(() => {
    if (commentsUpdated) {
      getComments(post.id, auth.authToken).then(({ data: comments }) => {
        setComments(comments.reverse());
        setCommentsUpdated(false);
      });
    }
  }, [commentsUpdated]);

  useEffect(() => {
    if (postsUpdated) {
      setCommentsUpdated(true);
    }
  }, [postsUpdated]);

  return (
    <>
      {commentsOpened ? (
        <PicleCommentView
          post={post}
          comments={comments}
          opened={commentsOpened}
          openHandlers={commentsOpenHandlers}
          height={postHeight}
          setCommentsUpdated={setCommentsUpdated}
        />
      ) : (
        <Box
          sx={(theme) => ({
            backgroundColor: profileColors[post.author.profileColor],
            borderRadius: theme.radius.lg,
          })}
        >
          <Container p="md" ref={sizeRef}>
            <Stack>
              <Image radius="xl" src={post.content} />
              <Group position="apart" noWrap align="flex-start" spacing="xs">
                <PicleUserText user={post.author} content={post.caption} />
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
                  <ActionIcon onClick={commentsOpenHandlers.open}>
                    <IconMessageCircle2 />
                  </ActionIcon>
                  <Text>{comments.length}</Text>
                </Stack>
              </Group>
            </Stack>
          </Container>
        </Box>
      )}
    </>
  );
};

export default PiclePost;
