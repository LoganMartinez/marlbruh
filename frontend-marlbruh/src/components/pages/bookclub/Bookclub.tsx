import { useEffect, useState } from "react";
import {
  getBook,
  getBookUserRelation,
  getBookclubComments,
  getBooks,
  getChapter,
  updateBookUserRelation,
} from "../../../api/apiCalls";
import { useAuth } from "../../../authentication/AuthContext";
import { AxiosError } from "axios";
import {
  errorNotification,
  successNotification,
} from "../../../utilities/helperFunctions";
import {
  ActionIcon,
  Button,
  Group,
  Loader,
  Pagination,
  Select,
  SimpleGrid,
  Space,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import BookSelectItem from "./BookSelectItem";
import { IconArrowUp, IconPlus } from "@tabler/icons-react";
import {
  useDisclosure,
  useLocalStorage,
  useViewportSize,
} from "@mantine/hooks";
import CreateBookclubPostModal from "./CreateBookclubPostModal";
import BookclubCommentView from "./BookclubCommentView";
import AddBookModal from "./AddBookModal";

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
  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState("discussion" as string | null);
  const [createModalOpen, createModelOpenHandlers] = useDisclosure(false);
  const [commentsUpdated, setCommentsUpdated] = useState(true);

  const [comments, setComments] = useState([] as BookclubComment[]);
  const [lastCompletedChapter, setLastCompletedChapter] = useState(
    undefined as number | undefined
  );
  const [relationChanged, setRelationChanged] = useState(true);
  const [addBookModalOpen, addBookModalHandlers] = useDisclosure(false);
  const [storedBookId, setStoredBookId] = useLocalStorage({
    key: "marlbruh-selected-book",
    defaultValue: -1 as number,
  });
  const [booksUpdated, setBooksUpdated] = useState(true);

  // get list of all books for select
  useEffect(() => {
    if (booksUpdated) {
      getBooks(auth.authToken)
        .then(({ data: res }: { data: Book[] }) => {
          setBooks(res);
        })
        .catch((err: AxiosError) => {
          errorNotification(err.message);
        });
      setBooksUpdated(false);
    }
  }, [booksUpdated]);

  // use local storage to get most recently selected book
  useEffect(() => {
    if (
      storedBookId !== undefined &&
      storedBookId >= 0 &&
      selectedBook === undefined
    ) {
      getBook(storedBookId, auth.authToken)
        .then(({ data: book }) => {
          setSelectedBook(book);
        })
        .catch(() => {
          setStoredBookId(-1);
        });
    }
  }, [storedBookId]);

  // update posts
  useEffect(() => {
    if (commentsUpdated && selectedBook) {
      getBookclubComments(selectedBook.id, auth.authToken)
        .then(({ data: coms }: { data: BookclubCommentNotFormatted[] }) => {
          const formattedComments = coms
            .map(({ highlighted, ...rest }) => ({
              highlighted: JSON.parse(highlighted),
              ...rest,
            }))
            .reverse();
          setComments(formattedComments);
        })
        .catch((err: AxiosError) => {
          errorNotification(err.message);
        });
      setCommentsUpdated(false);
    }
  }, [commentsUpdated, selectedBook]);

  // get chapter
  useEffect(() => {
    if (selectedBook) {
      getChapter(selectedBook.id, Math.max(selectedPage - 1, 0), auth.authToken)
        .then(({ data: chapter }) => {
          setSelectedChapter(chapter);
        })
        .catch((err: AxiosError) => {
          errorNotification(err.message);
        });
    }
  }, [selectedPage, selectedBook]);

  // update locked chapters
  useEffect(() => {
    if (selectedBook && relationChanged) {
      getBookUserRelation(selectedBook.id, auth.authToken)
        .then(({ data: relation }: { data: BookUserRelation }) => {
          setLastCompletedChapter(relation.lastChapterComplete);
          setSelectedPage(Math.max(relation.lastChapterComplete + 1, 1));
        })
        .catch((err: AxiosError) => {
          return errorNotification(err.message);
        });
      setRelationChanged(false);
    }
  }, [selectedBook, relationChanged]);

  const selectChange = (value: string) => {
    const bookId = parseInt(value);
    getBook(bookId, auth.authToken)
      .then(({ data: book }) => {
        setSelectedBook(book);
        setStoredBookId(book.id);
      })
      .catch((err: AxiosError) => {
        errorNotification(err.message);
      });
  };

  const unlockChapter = (chapterNumber: number) => {
    if (selectedBook) {
      updateBookUserRelation(selectedBook.id, chapterNumber, auth.authToken)
        .then(() => {
          successNotification(`Chapter ${chapterNumber + 1} unlocked!`);
          setRelationChanged(true);
        })
        .catch((err: AxiosError) => {
          errorNotification(err.message);
        });
    }
  };

  return (
    <>
      {selectedBook ? (
        <CreateBookclubPostModal
          opened={createModalOpen}
          openHandlers={createModelOpenHandlers}
          setCommentsUpdated={setCommentsUpdated}
          book={selectedBook}
        />
      ) : (
        <></>
      )}
      <AddBookModal
        opened={addBookModalOpen}
        openHandlers={addBookModalHandlers}
        setBooksUpdated={setBooksUpdated}
      />
      <Group position="apart" noWrap>
        <Select
          label="Select Book"
          itemComponent={BookSelectItem}
          data={books.map((book) => ({
            value: book.id.toString(),
            label: book.title,
            ...book,
          }))}
          value={selectedBook?.id.toString() || ""}
          onChange={selectChange}
        />
        {windowWidth >= 500 ? (
          <Button onClick={addBookModalHandlers.open}>Add Book</Button>
        ) : (
          <></>
        )}
      </Group>

      <Space h="xs" />

      {selectedBook ? (
        <Stack align="center">
          <Tabs value={selectedTab} onTabChange={setSelectedTab}>
            <Tabs.List>
              <Tabs.Tab value="discussion">Discussion</Tabs.Tab>
              <Tabs.Tab value="full">Full Book</Tabs.Tab>
            </Tabs.List>
          </Tabs>

          {selectedChapter ? (
            selectedTab === "discussion" ? (
              <>
                <Group position="apart" w="100%">
                  <Space />
                  <ActionIcon onClick={createModelOpenHandlers.open}>
                    <IconPlus />
                  </ActionIcon>
                </Group>
                <SimpleGrid
                  cols={3}
                  breakpoints={[
                    { maxWidth: "62rem", cols: 3, spacing: "md" },
                    { maxWidth: "48rem", cols: 2, spacing: "sm" },
                    { maxWidth: "36rem", cols: 1, spacing: "sm" },
                  ]}
                >
                  {comments.map((comment) => (
                    <BookclubCommentView
                      comment={comment}
                      setCommentsUpdated={setCommentsUpdated}
                      key={comment.id}
                      locked={
                        lastCompletedChapter === undefined ||
                        comment.chapterNumber > lastCompletedChapter
                      }
                      unlockChapter={unlockChapter}
                    />
                  ))}
                </SimpleGrid>
              </>
            ) : (
              <>
                <Pagination
                  total={selectedBook.numChapters}
                  siblings={1}
                  size={windowWidth > 500 ? "md" : "xs"}
                  value={selectedPage}
                  onChange={(page) => setSelectedPage(page)}
                />
                <Text>{selectedChapter.content}</Text>
              </>
            )
          ) : (
            <Loader />
          )}
        </Stack>
      ) : (
        <Group align="center">
          <IconArrowUp size="2rem" />
          <Title>Select a book</Title>
        </Group>
      )}
    </>
  );
};

export default Bookclub;
