import {
  ActionIcon,
  Box,
  Grid,
  Group,
  Loader,
  Progress,
  Select,
  Space,
  Switch,
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
  IconLanguage,
  IconLanguageOff,
  IconMaximize,
  IconMinimize,
} from "@tabler/icons-react";
import {
  useElementSize,
  useListState,
  useLocalStorage,
  useScrollIntoView,
  useViewportSize,
} from "@mantine/hooks";
import TranslateTool from "./TranslateTool";
import { BOOK_PAGE_LEN } from "../../../utilities/constants";
import PageCarousel from "./PageCarousel";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const useStyles = createStyles((theme) => ({
  fullscreen: {
    overflow: "scroll",
    paddingLeft: theme.spacing.md,
    paddingTop: "0px",
  },
}));

type Props = {
  book: BookWithNumChapters;
  userRelation: BookUserRelation;
  setRelationChanged: React.Dispatch<React.SetStateAction<boolean>>;
};

const FullBookView = ({ book, userRelation, setRelationChanged }: Props) => {
  const auth = useAuth();
  const { classes, cx } = useStyles();
  const windowWidth = useViewportSize().width;
  // affects breakpoints of progress bar grid
  const smallWindow = windowWidth < 500;
  const [translateEnabled, setTranslateEnabled] = useLocalStorage({
    key: "marlbruh-book-translate-enabled",
    defaultValue: false,
  });
  const [selectedChapterNo, setSelectedChapterNo] = useState(
    Math.max(userRelation.bookmarkedChapter, 0)
  );
  const [chapterPages, chapterPagesHandler] = useListState([] as string[]);
  const { ref: sizeRef, width } = useElementSize();
  let { scrollIntoView: scrollToTop, targetRef: scrollRef } =
    useScrollIntoView<HTMLDivElement>({
      duration: 300,
    });
  const [currentPage, setCurrentPage] = useState(
    Math.max(userRelation.bookmarkedPage, 0)
  );
  const [startPage, setStartPage] = useState(0);
  const fullScreenHandle = useFullScreenHandle();

  // get chapter
  useEffect(() => {
    getChapter(book.id, selectedChapterNo, auth.authToken)
      .then(({ data: chapter }: { data: Chapter }) => {
        const sp =
          selectedChapterNo === userRelation.bookmarkedChapter
            ? userRelation.bookmarkedPage
            : 0;
        setStartPage(sp);
        setCurrentPage(sp);
        chapterPagesHandler.setState([]);
        let [header, ...paragraphs] = chapter.content.split("<p");
        paragraphs = paragraphs.map((p) => "<p" + p);
        let currentPageLen = 0;
        let currentPageContent = header;
        paragraphs.forEach((p, index) => {
          const regexp = /\<p[^\>]*\>(?<inner>.*)\<\/p\>/; // strip away <p> and </p>, keeps any nested elements
          const innerHtml = p.match(regexp)?.groups?.inner;
          if (!innerHtml) {
            errorNotification("Some content may not be displayed properly" + p);
            return;
          }
          innerHtml.length;
          currentPageContent += p;
          currentPageLen += innerHtml.length;
          if (
            currentPageLen > BOOK_PAGE_LEN ||
            index === paragraphs.length - 1
          ) {
            chapterPagesHandler.append(currentPageContent);
            currentPageLen = 0;
            currentPageContent = "";
          }
        });
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
      <Group position="apart" w="100%" align="center" noWrap ref={sizeRef}>
        <div ref={scrollRef}>
          <Select
            label="Chapter"
            data={[...Array(book.numChapters).keys()].map((chapterNum) => ({
              value: chapterNum.toString(),
              label: `Chapter ${chapterNum + 1}`,
            }))}
            value={selectedChapterNo.toString()}
            onChange={(value) => {
              if (value) {
                const chapterNum = parseInt(value);
                setSelectedChapterNo(chapterNum);
              }
            }}
          />
        </div>
        <Switch
          onLabel={<IconLanguage size="1rem" />}
          offLabel={<IconLanguageOff size="1rem" />}
          checked={translateEnabled}
          onChange={(event) => setTranslateEnabled(event.currentTarget.checked)}
        />
      </Group>
      <FullScreen
        handle={fullScreenHandle}
        className={fullScreenHandle.active ? cx(classes["fullscreen"]) : ""}
      >
        <div>
          {translateEnabled ? (
            <TranslateTool fullscreen={fullScreenHandle.active} />
          ) : (
            <></>
          )}
          <Space h="xl" />

          {chapterPages.length > 0 ? (
            <>
              <Grid w="100%">
                <Grid.Col span={smallWindow ? 0 : 2}>
                  <Space />
                </Grid.Col>
                <Grid.Col span={8}>
                  <Progress
                    w="100%"
                    value={(currentPage / (chapterPages.length - 1)) * 100}
                  />
                </Grid.Col>
                <Grid.Col span={smallWindow ? 2 : 1}>
                  <Group position="center" w="100%" noWrap>
                    {selectedChapterNo === userRelation.bookmarkedChapter &&
                    currentPage === userRelation.bookmarkedPage ? (
                      <ActionIcon
                        pb="1rem"
                        onClick={() => toggleBookmark(false)}
                        variant="unstyled"
                      >
                        <Box sx={(theme) => ({ color: theme.colors.blue[6] })}>
                          <IconBookmarkFilled />
                        </Box>
                      </ActionIcon>
                    ) : (
                      <ActionIcon
                        pb="1rem"
                        onClick={() => toggleBookmark(true)}
                        variant="unstyled"
                      >
                        <IconBookmark />
                      </ActionIcon>
                    )}
                  </Group>
                </Grid.Col>
                <Grid.Col span={smallWindow ? 2 : 1}>
                  <Group position="center" w="100%" noWrap>
                    {fullScreenHandle.active ? (
                      <ActionIcon onClick={fullScreenHandle.exit} pb="1rem">
                        <IconMinimize />
                      </ActionIcon>
                    ) : (
                      <ActionIcon onClick={fullScreenHandle.enter} pb="1rem">
                        <IconMaximize />
                      </ActionIcon>
                    )}
                  </Group>
                </Grid.Col>
              </Grid>

              <PageCarousel
                pages={chapterPages}
                css={book.cssStyles}
                width={fullScreenHandle.active ? windowWidth : width}
                scrollToTop={scrollToTop}
                setCurrentPage={setCurrentPage}
                startPage={startPage}
              />
            </>
          ) : (
            <Loader />
          )}

          <Space h="5rem" />
        </div>
      </FullScreen>
    </>
  );
};

export default FullBookView;
