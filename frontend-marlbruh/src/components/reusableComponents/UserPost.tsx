import {
  ActionIcon,
  Box,
  Container,
  Group,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { PropsWithChildren, useState } from "react";
import PicleUserText from "./UserText";
import { profileColors, profileColorsSolid } from "../../utilities/constants";
import { IconHeartFilled, IconMessageCircle2 } from "@tabler/icons-react";
import { IconHeart } from "@tabler/icons-react";
import { useAuth } from "../../authentication/AuthContext";
import { useElementSize } from "@mantine/hooks";
import LikeList from "./LikeList";
import CommentList from "./CommentList";
import { likePiclePost } from "../../api/apiCalls";
import { errorNotification } from "../../utilities/helperFunctions";
import { AxiosError } from "axios";

type Props = {
  id: number;
  author: User;
  likes: User[];
  caption: string;
  comments: PicleComment[];
  submitComment: (values: SubmitCommentForm) => void;
  toggleCommentLike: (commentId: number) => void;
} & PropsWithChildren;

const UserPost = ({
  id,
  children,
  author,
  likes,
  caption,
  comments,
  submitComment,
  toggleCommentLike,
}: Props) => {
  const { ref: sizeRef, height: postHeight } = useElementSize();
  const [currentView, setCurrentView] = useState("post" as PostView);
  const auth = useAuth();
  const [liked, setLiked] = useState(
    likes.some((user) => user.userId === auth.currentUser.userId)
  );
  const [numLikes, setNumLikes] = useState(likes.length);

  const toggleLike = () => {
    const l = liked;
    setLiked(!l);
    setNumLikes((n) => (l ? n - 1 : n + 1));
    likePiclePost(id, auth.authToken).catch((err: AxiosError) => {
      errorNotification(`failed to update like on post: ${err.message}`);
      setLiked(l);
      setNumLikes((n) => (l ? n + 1 : n - 1));
    });
  };

  return (
    <>
      {currentView === "likes" ? (
        <LikeList
          height={postHeight}
          setCurrentView={setCurrentView}
          backgroundColor={profileColors[author.profileColor]}
          likes={likes}
        />
      ) : currentView === "comments" ? (
        <CommentList
          height={postHeight}
          backgroundColor={profileColors[author.profileColor]}
          setCurrentView={setCurrentView}
          comments={comments}
          submitComment={submitComment}
          toggleCommentLike={toggleCommentLike}
        />
      ) : (
        <Box
          sx={(theme) => ({
            backgroundColor: profileColors[author.profileColor],
            borderRadius: theme.radius.lg,
          })}
          ref={sizeRef}
        >
          <Container p="md">
            <Stack>
              {children}
              <Group position="apart" noWrap align="flex-start" spacing="xs">
                <PicleUserText user={author} content={caption} />
                <Stack spacing={0} align="center">
                  <ActionIcon onClick={toggleLike}>
                    {liked ? (
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
                  <UnstyledButton onClick={() => setCurrentView("likes")}>
                    <Text>{numLikes}</Text>
                  </UnstyledButton>

                  <ActionIcon onClick={() => setCurrentView("comments")}>
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

export default UserPost;
