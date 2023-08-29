import { useEffect, useState } from "react";
import { getBook, getBooks, getChapter } from "../../../api/apiCalls";
import { useAuth } from "../../../authentication/AuthContext";
import { AxiosError } from "axios";
import { errorNotification } from "../../../utilities/helperFunctions";
import {
  ActionIcon,
  Button,
  Group,
  Loader,
  Pagination,
  Select,
  Space,
  Stack,
  Tabs,
  Text,
} from "@mantine/core";
import BookSelectItem from "./BookSelectItem";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import CreateBookclubPostModal from "./CreateBookclubPostModal";
import BookclubCommentView from "./BookclubCommentsView";

const Bookclub = () => {
  const auth = useAuth();
  const [books, setBooks] = useState([] as Book[]);
  const [selectedBook, setSelectedBook] = useState(
    undefined as BookWithNumChapters | undefined
  );
  const [selectedChapter, setSelectedChapter] = useState(
    undefined as Chapter | undefined
  );
  const windowWidth = useViewportSize().width;
  const [selectedPage, setSelectedPage] = useState(0);
  const [selectedTab, setSelectedTab] = useState("full" as string | null);
  const [createModalOpen, createModelOpenHandlers] = useDisclosure(false);
  const [commentsUpdated, setCommentsUpdated] = useState(false);

  useEffect(() => {
    getBooks(auth.authToken)
      .then(({ data: res }) => {
        setBooks(res);
      })
      .catch((err: AxiosError) => {
        errorNotification(err.message);
      });
  }, []);

  const selectChange = (value: string) => {
    const bookId = parseInt(value);
    getBook(bookId, auth.authToken)
      .then(({ data: book }) => {
        setSelectedBook(book);
        setSelectedPage(1);
      })
      .catch((err: AxiosError) => {
        errorNotification(err.message);
      });
  };

  useEffect(() => {
    if (selectedBook) {
      getChapter(selectedBook.id, selectedPage - 1, auth.authToken)
        .then(({ data: chapter }) => {
          setSelectedChapter(chapter);
          setCommentsUpdated(true);
        })
        .catch((err: AxiosError) => {
          errorNotification(err.message);
        });
    }
  }, [selectedPage]);

  return (
    <>
      <CreateBookclubPostModal
        chapter={selectedChapter}
        opened={createModalOpen}
        openHandlers={createModelOpenHandlers}
        setCommentsUpdated={setCommentsUpdated}
      />
      <Group position="apart">
        <Select
          itemComponent={BookSelectItem}
          data={books.map((book) => ({
            value: book.id.toString(),
            label: book.title,
            ...book,
          }))}
          onChange={selectChange}
        />
        <Button>Add Book</Button>
      </Group>

      <Space h="xs" />

      {selectedBook ? (
        <Stack align="center">
          <Tabs value={selectedTab} onTabChange={setSelectedTab}>
            <Tabs.List>
              <Tabs.Tab value="full">Full Book</Tabs.Tab>
              <Tabs.Tab value="discussion">Discussion</Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <Pagination
            total={selectedBook.numChapters}
            siblings={1}
            size={windowWidth > 500 ? "md" : "xs"}
            onChange={(page) => setSelectedPage(page)}
          />
          {selectedChapter ? (
            selectedTab === "discussion" ? (
              <>
                <Group position="apart" w="100%">
                  <Space />
                  <ActionIcon onClick={createModelOpenHandlers.open}>
                    <IconPlus />
                  </ActionIcon>
                </Group>
                <BookclubCommentView
                  chapter={selectedChapter}
                  commentsUpdated={commentsUpdated}
                  setCommentsUpdated={setCommentsUpdated}
                />
              </>
            ) : (
              <Text>{selectedChapter.content}</Text>
            )
          ) : (
            <Loader />
          )}
        </Stack>
      ) : (
        <></>
      )}
    </>
  );
};

export default Bookclub;
