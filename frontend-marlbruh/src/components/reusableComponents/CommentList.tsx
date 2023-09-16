import {
  ActionIcon,
  Box,
  CloseButton,
  Container,
  Group,
  ScrollArea,
  Space,
  Stack,
  Text,
  Textarea,
  Title,
  px,
  useMantineTheme,
} from "@mantine/core";
import PicleUserText from "./UserText";
import React from "react";
import { IconHeart, IconHeartFilled, IconSend } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useElementSize } from "@mantine/hooks";
import { useAuth } from "../../authentication/AuthContext";
import { profileColorsSolid } from "../../utilities/constants";

type Props = {
  height: number;
  backgroundColor: string;
  setCurrentView: React.Dispatch<React.SetStateAction<PostView>>;
  comments: PostComment[];
  submitComment: (values: SubmitCommentForm) => void;
  toggleCommentLike: (commentId: number) => void;
};

const CommentList = ({
  height,
  backgroundColor,
  comments,
  setCurrentView,
  submitComment,
  toggleCommentLike,
}: Props) => {
  const auth = useAuth();
  const { ref: headerSizeRef, height: headerHeight } = useElementSize();
  const { ref: textAreaSizeRef, height: textAreaHeight } = useElementSize();
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      commentText: "",
    } as SubmitCommentForm,

    validate: {
      commentText: (value) => {
        const noNewLines = value.replace(/\n/g, "");
        if (!noNewLines) {
          return "Comment can not be empty";
        }
        if (noNewLines.length > 250) {
          return "Comment must be 250 characters or less";
        }
        return null;
      },
    },
  });

  const submitForm = (values: SubmitCommentForm) => {
    submitComment(values);
    form.reset();
  };

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
        <Stack spacing={0}>
          <Group position="apart" ref={headerSizeRef}>
            <Title>Comments</Title>
            <CloseButton size="md" onClick={() => setCurrentView("post")} />
          </Group>
          <ScrollArea
            h={
              height -
              headerHeight -
              textAreaHeight -
              px(theme.spacing.lg) * 3 -
              px("1rem")
            }
          >
            <Stack>
              {comments.map((comment) => (
                <PicleUserText
                  user={comment.author}
                  content={comment.content}
                  key={comment.id}
                  rightIcon={
                    <Group spacing=".3rem">
                      <ActionIcon onClick={() => toggleCommentLike(comment.id)}>
                        {comment.likes.some(
                          (user) => user.userId === auth.currentUser.userId
                        ) ? (
                          <Box
                            style={{
                              color:
                                profileColorsSolid[
                                  auth.currentUser.profileColor
                                ],
                            }}
                          >
                            <IconHeartFilled />
                          </Box>
                        ) : (
                          <IconHeart />
                        )}
                      </ActionIcon>
                      <Text>{comment.likes.length}</Text>
                    </Group>
                  }
                />
              ))}
            </Stack>
          </ScrollArea>
          <Space h="1rem" />
          <form onSubmit={form.onSubmit((values) => submitForm(values))}>
            <Textarea
              ref={textAreaSizeRef}
              radius="lg"
              rightSection={
                <ActionIcon type="submit">
                  <IconSend strokeWidth={0.5} />
                </ActionIcon>
              }
              {...form.getInputProps("commentText")}
              onChange={(event) => {
                const filteredValue = event.target.value.replace(/\n/g, "");
                form.setFieldValue("commentText", filteredValue);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && form.isValid()) {
                  submitForm(form.values);
                }
              }}
            />
          </form>
        </Stack>
      </Container>
    </Box>
  );
};

export default CommentList;
