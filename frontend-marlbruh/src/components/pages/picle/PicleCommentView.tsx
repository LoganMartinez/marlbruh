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
import { profileColors } from "../../../utilities/constants";
import PicleUserText from "./PicleUserText";
import { useForm } from "@mantine/form";
import { IconSend } from "@tabler/icons-react";
import { createComment } from "../../../api/apiCalls";
import { useAuth } from "../../../authentication/AuthContext";
import { AxiosError } from "axios";
import { errorNotification } from "../../../utilities/helperFunctions";

type Props = {
  post: PiclePost;
  comments: PicleComment[];
  setCurrentView: React.Dispatch<React.SetStateAction<PiclePostView>>;
  height: number;
  setCommentsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

type Form = {
  commentText: string;
};

const PicleCommentView = ({
  post,
  comments,
  setCurrentView,
  height,
  setCommentsUpdated,
}: Props) => {
  const auth = useAuth();
  const form = useForm({
    initialValues: {
      commentText: "",
    } as Form,

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

  const submitForm = (values: Form) => {
    createComment(post.id, values.commentText, auth.authToken)
      .then(() => {
        form.reset();
        setCommentsUpdated(true);
      })
      .catch((err: AxiosError) => {
        errorNotification(err.message);
      });
  };

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
        <form onSubmit={form.onSubmit((values) => submitForm(values))}>
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
          </Stack>
        </form>
      </Container>
    </Box>
  );
};

export default PicleCommentView;
