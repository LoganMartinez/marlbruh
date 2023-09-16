import { ActionIcon, Group, Loader, Menu, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { getChapter } from "../../../api/apiCalls";
import { useAuth } from "../../../authentication/AuthContext";
import { errorNotification } from "../../../utilities/helperFunctions";
import { AxiosError } from "axios";
import { IconSettings } from "@tabler/icons-react";
import { useLocalStorage } from "@mantine/hooks";
import TranslateTool from "./TranslateTool";

type Props = {
  book: BookWithNumChapters;
  lastChapterComplete: number;
};

const FullBookView = ({ book, lastChapterComplete }: Props) => {
  const auth = useAuth();
  const [translateEnabled, setTranslateEnabled] = useLocalStorage({
    key: "marlbruh-book-translate-enabled",
    defaultValue: false,
  });
  // const [translateEnabled, { toggle: toggleTranslateEnabled }] =
  //   useDisclosure(false);
  const [selectedPage, setSelectedPage] = useState(
    Math.max(lastChapterComplete, 1)
  );
  const [selectedChapter, setSelectedChapter] = useState(
    undefined as Chapter | undefined
  );

  // get chapter
  useEffect(() => {
    getChapter(book.id, selectedPage, auth.authToken)
      .then(({ data: chapter }) => {
        setSelectedChapter(chapter);
      })
      .catch((err: AxiosError) => {
        errorNotification(err.message);
      });
  }, [selectedPage, book]);

  return (
    <>
      {selectedChapter ? (
        <>
          <Group position="apart" w="100%" align="flex-start" noWrap>
            <Select
              label="Chapter"
              data={[...Array(book.numChapters).keys()].map((chapterNum) => ({
                value: chapterNum.toString(),
                label: `Chapter ${chapterNum + 1}`,
              }))}
              value={selectedPage.toString()}
              onChange={(value) => {
                if (value) {
                  const chapterNum = parseInt(value);
                  setSelectedPage(chapterNum);
                }
              }}
            />
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

          <div>
            <style>{book.cssStyles}</style>
            <div
              dangerouslySetInnerHTML={{ __html: selectedChapter.content }}
            />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default FullBookView;
