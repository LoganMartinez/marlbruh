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

type Props = {
  chapter: Chapter | undefined;
  opened: boolean;
  openHandlers: DisclosureHandler;
};

type Form = {
  passage: string;
  comment: string;
};

const CreateBookclubPostModal = ({ chapter, opened, openHandlers }: Props) => {
  const [searchResults, setSearchResults] = useState([] as string[]);
  const textSelection = useTextSelection();
  const [highlight, highlightHandlers] = useListState([] as string[]);

  const form = useForm({
    initialValues: {
      passage: "",
      comment: "",
    } as Form,

    validate: {
      comment: (value) => (value ? null : "Comment can not be blank"),
    },
  });

  const submitForm = (values: Form) => {
    // make sure you include highlighted words
    console.log(values);
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
