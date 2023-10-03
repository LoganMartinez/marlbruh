import {
  ActionIcon,
  Box,
  Grid,
  Group,
  Loader,
  Menu,
  Progress,
  Select,
  Space,
  createStyles,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { bookmarkPage, getChapter } from "../../../api/apiCalls";
import { useAuth } from "../../../authentication/AuthContext";
import { errorNotification } from "../../../utilities/helperFunctions";
import { AxiosError } from "axios";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconDots,
} from "@tabler/icons-react";
import {
  useDisclosure,
  useElementSize,
  useLocalStorage,
  useViewportSize,
} from "@mantine/hooks";
import TranslateTool from "./TranslateTool";
import PageCarousel from "./PageCarousel";

const useStyles = createStyles((theme) => ({
  fullscreen: {
    position: "absolute",
    zIndex: 1000,
    backgroundColor: theme.colors.dark[8],
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    paddingLeft: theme.spacing.md,
  },
  notFullscreen: {
    width: "100%",
  },
}));

type Props = {
  book: BookWithNumChapters;
  userRelation: BookUserRelation;
  setRelationChanged: React.Dispatch<React.SetStateAction<boolean>>;
};

const FullBookView = ({ book, userRelation, setRelationChanged }: Props) => {
  const auth = useAuth();
  const [fsActive, fsHandlers] = useDisclosure();
  const { classes, cx } = useStyles();
  const { width: windowWidth, height: windowHeight } = useViewportSize();
  const smallWindow = windowWidth < 500; // affects breakpoints of progress bar grid
  const [translateEnabled, setTranslateEnabled] = useLocalStorage({
    key: "marlbruh-book-translate-enabled",
    defaultValue: false,
  });
  const [chapter, setChapter] = useState(undefined as Chapter | undefined);
  const [selectedChapterNo, setSelectedChapterNo] = useState(
    Math.max(userRelation.bookmarkedChapter, 0)
  );
  const { ref: sizeRef, width } = useElementSize();
  const [currentPage, setCurrentPage] = useState(
    Math.max(userRelation.bookmarkedPage, 0)
  );
  const [startPage, setStartPage] = useState(0);
  const [numPages, setNumPages] = useState(0);
  // get chapter
  useEffect(() => {
    getChapter(book.id, selectedChapterNo, auth.authToken)
      .then(({ data: ch }: { data: Chapter }) => {
        if (chapter?.id !== ch.id) {
          const sp =
            selectedChapterNo === userRelation.bookmarkedChapter
              ? userRelation.bookmarkedPage
              : 0;
          setStartPage(sp);
          setChapter(ch);
          setCurrentPage(sp);
        }
      })
      .catch((err: AxiosError) => {
        errorNotification(err.message);
      });
  }, [selectedChapterNo, book]);

  const toggleBookmark = (on: Boolean) => {
    const chapterNo = on ? selectedChapterNo : -1;
    const pageNo = on ? currentPage : -1;
    bookmarkPage(book.id, chapterNo, pageNo, auth.authToken)
      .then(() => {
        setRelationChanged(true);
      })
      .catch((err: AxiosError) => {
        errorNotification(err.message);
      });
  };

  return (
    <>
      <div
        className={
          fsActive ? cx(classes["fullscreen"]) : cx(classes["notFullscreen"])
        }
        ref={sizeRef}
      >
        {translateEnabled ? <TranslateTool fullscreen={fsActive} /> : <></>}

        {numPages > 0 ? (
          <Grid w="100%" align="center">
            <Grid.Col span={smallWindow ? 0 : 2}>
              <Space />
            </Grid.Col>
            <Grid.Col span={smallWindow ? 10 : 8}>
              <Group position="center">
                <Progress
                  w="90%"
                  value={(currentPage / (numPages - 1)) * 100}
                />
              </Group>
            </Grid.Col>
            <Grid.Col span={2}>
              <Group position="center" w="100%" noWrap spacing="xs">
                {selectedChapterNo === userRelation.bookmarkedChapter &&
                currentPage === userRelation.bookmarkedPage ? (
                  <ActionIcon
                    onClick={() => toggleBookmark(false)}
                    variant="unstyled"
                  >
                    <Box sx={(theme) => ({ color: theme.colors.blue[6] })}>
                      <IconBookmarkFilled />
                    </Box>
                  </ActionIcon>
                ) : (
                  <ActionIcon
                    onClick={() => toggleBookmark(true)}
                    variant="unstyled"
                  >
                    <IconBookmark />
                  </ActionIcon>
                )}
                <Menu>
                  <Menu.Target>
                    <ActionIcon>
                      <IconDots />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item closeMenuOnClick={false}>
                      <Select
                        data={[...Array(book.numChapters).keys()].map(
                          (chapterNum) => ({
                            value: chapterNum.toString(),
                            label: `Chapter ${chapterNum + 1}`,
                          })
                        )}
                        value={selectedChapterNo.toString()}
                        onChange={(value) => {
                          if (value) {
                            const chapterNum = parseInt(value);
                            setSelectedChapterNo(chapterNum);
                          }
                        }}
                      />
                    </Menu.Item>
                    <Menu.Item onClick={fsHandlers.toggle}>
                      Toggle Fullscreen
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => setTranslateEnabled((prev) => !prev)}
                    >
                      Toggle Translate Tool
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Grid.Col>
          </Grid>
        ) : (
          <></>
        )}

        {chapter?.content ? (
          <PageCarousel
            chapterContent={chapter.content}
            css={book.cssStyles}
            width={fsActive ? windowWidth : width}
            setCurrentPage={setCurrentPage}
            startPage={startPage}
            setNumPages={setNumPages}
            height={windowHeight}
          />
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default FullBookView;
