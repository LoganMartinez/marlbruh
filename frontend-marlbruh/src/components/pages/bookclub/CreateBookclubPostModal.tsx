import {
  ActionIcon,
  Autocomplete,
  Button,
  Group,
  Highlight,
  Loader,
  Modal,
  Space,
  Stack,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useListState, useTextSelection } from "@mantine/hooks";
import { IconHighlight, IconHighlightOff } from "@tabler/icons-react";
import { useState } from "react";
import { createBookclubComment } from "../../../api/apiCalls";
import { useAuth } from "../../../authentication/AuthContext";
import {
  errorNotification,
  successNotification,
} from "../../../utilities/helperFunctions";
import { AxiosError } from "axios";

type Props = {
  chapter: Chapter | undefined;
  opened: boolean;
  openHandlers: DisclosureHandler;
  setCommentsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

type Form = {
  passage: string;
  comment: string;
};

const CreateBookclubPostModal = ({
  chapter,
  opened,
  openHandlers,
  setCommentsUpdated,
}: Props) => {
  const auth = useAuth();
  const [searchResults, setSearchResults] = useState([] as string[]);
  const textSelection = useTextSelection();
  const [highlight, highlightHandlers] = useListState([] as string[]);

  const form = useForm({
    initialValues: {
      passage: "",
      comment: "",
    } as Form,

    validate: {
      passage: (value) => (value ? null : "Passage is required"),
      comment: (value) => (value ? null : "Comment can not be blank"),
    },
  });

  const submitForm = (values: Form) => {
    if (chapter) {
      createBookclubComment(
        chapter.book.id,
        chapter.chapterNumber,
        values.passage,
        values.comment,
        highlight,
        auth.authToken
      )
        .then(() => {
          successNotification("Created new comment");
          setCommentsUpdated(true);
        })
        .catch((err: AxiosError) => {
          errorNotification(err.message);
        })
        .finally(() => {
          form.reset();
          openHandlers.close();
        });
    }
  };

  const searchChapter = (searchTerm: string) => {
    if (!chapter) {
      return [];
    }
    const hits = chapter.content.split(new RegExp(searchTerm, "i")).slice(1);
    if (hits.length === 0) {
      return [];
    }
    const truncatedHits = hits.map((hit) => {
      const words = hit.split(" ");
      const firstN = words.slice(0, 50).join(" ");
      return searchTerm + firstN + (words.length > 10 ? "..." : "");
    });
    return truncatedHits;
  };

  return (
    <Modal
      title="Create Bookclub Post"
      opened={opened}
      onClose={openHandlers.close}
    >
      <form
        onSubmit={form.onSubmit((values) => {
          submitForm(values);
        })}
      >
        {chapter ? (
          <Stack>
            {form.values.passage ? (
              <Button
                w="10rem"
                variant="outline"
                size="xs"
                onClick={() => {
                  form.setFieldValue("passage", "");
                  highlightHandlers.setState([]);
                }}
              >
                Change Passage
              </Button>
            ) : (
              <Autocomplete
                withAsterisk
                label="Passage Select"
                data={searchResults}
                onChange={(value) => {
                  setSearchResults(
                    value && value.length >= 4 ? searchChapter(value) : []
                  );
                  if (searchResults.includes(value)) {
                    form.setFieldValue("passage", value);
                  }
                }}
                dropdownPosition="bottom"
                withinPortal
              />
            )}

            <div>
              <Group position="apart">
                <Space h="1.8rem" />
                {textSelection &&
                highlight.includes(textSelection.toString()) ? (
                  <ActionIcon
                    style={{
                      display: textSelection?.toString() ? "" : "none",
                    }}
                    onClick={() =>
                      highlightHandlers.filter(
                        (item) => item !== textSelection.toString()
                      )
                    }
                  >
                    <IconHighlightOff />
                  </ActionIcon>
                ) : (
                  <ActionIcon
                    style={{
                      display:
                        textSelection?.toString() &&
                        form.values.passage.includes(textSelection.toString())
                          ? ""
                          : "none",
                    }}
                    onClick={() =>
                      highlightHandlers.append(textSelection?.toString() || "")
                    }
                  >
                    <IconHighlight />
                  </ActionIcon>
                )}
              </Group>
              <Highlight highlight={highlight}>{form.values.passage}</Highlight>
            </div>
            <Textarea
              withAsterisk
              label="Comment"
              minRows={5}
              {...form.getInputProps("comment")}
            />
            <Button type="submit">Post</Button>
          </Stack>
        ) : (
          <Loader />
        )}
      </form>
    </Modal>
  );
};

export default CreateBookclubPostModal;
