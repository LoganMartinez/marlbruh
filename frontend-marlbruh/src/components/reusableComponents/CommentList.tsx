import {
  ActionIcon,
  Box,
  CloseButton,
  Container,
  Group,
  ScrollArea,
  Stack,
  Textarea,
  Title,
} from "@mantine/core";
import PicleUserText from "./UserText";
import React from "react";
import { IconSend } from "@tabler/icons-react";
import { useForm } from "@mantine/form";

type Props = {
  height: number;
  backgroundColor: string;
  setCurrentView: React.Dispatch<React.SetStateAction<PostView>>;
  comments: PostComment[];
  submitComment: (values: SubmitCommentForm) => void;
};

const CommentList = ({
  height,
  backgroundColor,
  comments,
  setCurrentView,
  submitComment,
}: Props) => {
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
          <Group position="apart">
            <Title>Comments</Title>
            <CloseButton size="md" onClick={() => setCurrentView("post")} />
          </Group>
          <ScrollArea h={height - 144}>
            <Stack>
              {comments.map((comment) => (
                <PicleUserText
                  user={comment.author}
                  content={comment.content}
                  key={comment.id}
                />
              ))}
            </Stack>
          </ScrollArea>
          <form onSubmit={form.onSubmit((values) => submitForm(values))}>
            <Textarea
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
