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

type Props = {
  author: User;
  likes: User[];
  caption: string;
  toggleLike: () => void;
  comments: PicleComment[];
  submitComment: (values: SubmitCommentForm) => void;
} & PropsWithChildren;

const UserPost = ({
  children,
  author,
  likes,
  caption,
  toggleLike,
  comments,
  submitComment,
}: Props) => {
  const { ref: sizeRef, height: postHeight } = useElementSize();
  const [currentView, setCurrentView] = useState("post" as PostView);
  const auth = useAuth();

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
        />
      ) : (
        <Box
          sx={(theme) => ({
            backgroundColor: profileColors[author.profileColor],
            borderRadius: theme.radius.lg,
          })}
        >
          <Container p="md" ref={sizeRef}>
            <Stack>
              {children}
              <Group position="apart" noWrap align="flex-start" spacing="xs">
                <PicleUserText user={author} content={caption} />
                <Stack spacing={0} align="center">
                  <ActionIcon onClick={toggleLike}>
                    {likes.some(
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
                  <UnstyledButton onClick={() => setCurrentView("likes")}>
                    <Text>{likes.length}</Text>
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
