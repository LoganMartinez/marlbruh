import {
  Autocomplete,
  Button,
  Group,
  Highlight,
  Modal,
  Select,
  Space,
  Stack,
  Switch,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useListState, useTextSelection } from "@mantine/hooks";
import { IconHighlight, IconHighlightOff } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { createBookclubComment, getChapter } from "../../../api/apiCalls";
import { useAuth } from "../../../authentication/AuthContext";
import {
  errorNotification,
  replaceUnicodeChars,
  successNotification,
} from "../../../utilities/helperFunctions";
import { AxiosError } from "axios";

type Props = {
  opened: boolean;
  openHandlers: DisclosureHandler;
  setCommentsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  book: BookWithNumChapters;
};

type Form = {
  passage: string;
  comment: string;
};

const CreateBookclubPostModal = ({
  opened,
  openHandlers,
  setCommentsUpdated,
  book,
}: Props) => {
  const auth = useAuth();
  const [chapter, setChapter] = useState(undefined as Chapter | undefined);
  const [searchResults, setSearchResults] = useState([] as string[]);
  const textSelection = useTextSelection();
  const [highlight, highlightHandlers] = useListState([] as string[]);
  const [highlightedPhrase, setHighlightedPhrase] = useState("");
  const [highlightMode, setHighlighMode] = useState(false);

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
          setSearchResults([]);
          setChapter(undefined);
          highlightHandlers.setState([]);
          openHandlers.close();
        });
    }
  };

  const searchChapter = (searchTerm: string) => {
    if (!chapter) {
      return [];
    }
    const specialChars = "(){}?.[]+*\\|";
    let regexSearchTerm = searchTerm;
    for (let i = 0; i < specialChars.length; i++) {
      regexSearchTerm = regexSearchTerm.replace(
        specialChars[i],
        `\\${specialChars[i]}`
      );
    }
    // replace unicode apostrophes/quotes
    regexSearchTerm = replaceUnicodeChars(regexSearchTerm);

    const hits = chapter.content
      .split(new RegExp(regexSearchTerm, "i"))
      .slice(1);
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

  const selectChapter = (chapterNumStr: string) => {
    const chapterNum = parseInt(chapterNumStr);
    getChapter(book.id, chapterNum, auth.authToken).then(
      ({ data: { content, ...rest } }: { data: Chapter }) => {
        setChapter({ content: replaceUnicodeChars(content), ...rest });
        setSearchResults([]);
        highlightHandlers.setState([]);
      }
    );
  };

  useEffect(() => {
    const trimmedPhrase = highlightedPhrase.trim();
    if (
      highlightMode &&
      textSelection?.toString() === "" &&
      trimmedPhrase !== ""
    ) {
      if (highlight.includes(trimmedPhrase)) {
        highlightHandlers.filter((str) => str !== trimmedPhrase);
      } else {
        highlightHandlers.append(trimmedPhrase);
      }
    } else {
      setHighlightedPhrase(textSelection?.toString() || "");
    }
  }, [textSelection?.toString()]);

  return (
    <Modal
      title="Create Bookclub Post"
      opened={opened}
      onClose={() => {
        form.reset();
        setSearchResults([]);
        setChapter(undefined);
        highlightHandlers.setState([]);
        openHandlers.close();
      }}
    >
      <form
        onSubmit={form.onSubmit((values) => {
          submitForm(values);
        })}
      >
        <Stack>
          <Select
            withAsterisk
            label="Chapter"
            data={[...Array(book.numChapters).keys()].map((chapterNum) => ({
              value: chapterNum.toString(),
              label: `Chapter ${chapterNum + 1}`,
            }))}
            onChange={(value) => {
              if (value) {
                selectChapter(value);
              }
            }}
          />
          {form.values.passage ? (
            <>
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
              <div>
                <Group position="apart">
                  <Space h="1.8rem" />
                  <Group spacing={0}>
                    <Switch
                      onLabel={<IconHighlight size="1.5rem" />}
                      offLabel={<IconHighlightOff size="1.5rem" />}
                      checked={highlightMode}
                      onChange={() => setHighlighMode((prev) => !prev)}
                      size="md"
                    />
                  </Group>
                </Group>
                <Highlight highlight={highlight}>
                  {form.values.passage}
                </Highlight>
              </div>
            </>
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
              disabled={chapter === undefined}
            />
          )}

          <Textarea
            withAsterisk
            label="Comment"
            minRows={5}
            {...form.getInputProps("comment")}
          />
          <Button type="submit">Post</Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default CreateBookclubPostModal;
