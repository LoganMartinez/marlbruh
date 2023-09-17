import {
  ActionIcon,
  Grid,
  Group,
  Loader,
  Menu,
  Progress,
  Select,
  Space,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { bookmarkPage, getChapter } from "../../../api/apiCalls";
import { useAuth } from "../../../authentication/AuthContext";
import { errorNotification } from "../../../utilities/helperFunctions";
import { AxiosError } from "axios";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconSettings,
} from "@tabler/icons-react";
import {
  useElementSize,
  useListState,
  useLocalStorage,
  useScrollIntoView,
} from "@mantine/hooks";
import TranslateTool from "./TranslateTool";
import { BOOK_PAGE_LEN } from "../../../utilities/constants";
import PageCarousel from "./PageCarousel";

type Props = {
  book: BookWithNumChapters;
  userRelation: BookUserRelation;
  setRelationChanged: React.Dispatch<React.SetStateAction<boolean>>;
};

const FullBookView = ({ book, userRelation, setRelationChanged }: Props) => {
  const auth = useAuth();
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

  // get chapter
  useEffect(() => {
    getChapter(book.id, selectedChapterNo, auth.authToken)
      .then(({ data: chapter }: { data: Chapter }) => {
        chapterPagesHandler.setState([]);
        let [header, ...paragraphs] = chapter.content.split("<p");
        paragraphs = paragraphs.map((p) => "<p" + p);
        let currentPageLen = 0;
        let currentPageContent = header;
        paragraphs.forEach((p) => {
          const regexp = /\<p[^\>]*\>(?<inner>.*)\<\/p\>/; // strip away <p> and </p>, keeps any nested elements
          const innerHtml = p.match(regexp)?.groups?.inner;
          if (!innerHtml) {
            errorNotification("Some content may not be displayed properly" + p);
            return;
          }
          innerHtml.length;
          currentPageContent += p;
          currentPageLen += innerHtml.length;
          if (currentPageLen > BOOK_PAGE_LEN) {
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
      {chapterPages.length > 0 ? (
        <>
          <Group
            position="apart"
            w="100%"
            align="flex-start"
            noWrap
            ref={sizeRef}
          >
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

            <Menu>
              <Menu.Target>
                <ActionIcon>
                  <IconSettings />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={() => setTranslateEnabled((prev) => !prev)}>
                  {translateEnabled
                    ? "Disable Translate Tool"
                    : "Enable Translate Tool"}
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
          <TranslateTool enabled={translateEnabled} />
          <Grid w="100%">
            <Grid.Col span={2}>
              <Space />
            </Grid.Col>
            <Grid.Col span={8}>
              <Progress
                w="100%"
                value={(currentPage / (chapterPages.length - 1)) * 100}
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <Group position="apart" w="100%" noWrap>
                <Space />

                {selectedChapterNo === userRelation.bookmarkedChapter &&
                currentPage === userRelation.bookmarkedPage ? (
                  <ActionIcon pb="1rem" onClick={() => toggleBookmark(false)}>
                    <IconBookmarkFilled />
                  </ActionIcon>
                ) : (
                  <ActionIcon pb="1rem" onClick={() => toggleBookmark(true)}>
                    <IconBookmark />
                  </ActionIcon>
                )}
              </Group>
            </Grid.Col>
          </Grid>

          <PageCarousel
            pages={chapterPages}
            css={book.cssStyles}
            width={width}
            scrollToTop={scrollToTop}
            setCurrentPage={setCurrentPage}
            startPage={currentPage}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default FullBookView;
