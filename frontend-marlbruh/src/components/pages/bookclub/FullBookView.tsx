import {
  ActionIcon,
  Group,
  Loader,
  Menu,
  Select,
  Space,
  Stack,
  Text,
  TextInput,
  createStyles,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { getChapter, wrTranslate } from "../../../api/apiCalls";
import { useAuth } from "../../../authentication/AuthContext";
import { errorNotification } from "../../../utilities/helperFunctions";
import { AxiosError } from "axios";
import {
  IconArrowRight,
  IconBook2,
  IconEdit,
  IconSettings,
  IconX,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  WrLanguage,
  prettyTranslateLanguages,
  selectLanguageData,
} from "../../../utilities/constants";

const useStyles = createStyles((theme) => ({
  sticky: {
    position: "sticky",
    top: "70px",
    width: "100%",
    paddingTop: "1rem",
    paddingBottom: "2rem",
    paddingLeft: "0px",
    paddingRight: "0px",
    backgroundColor: theme.colors.dark[8],
    borderBottom: `2px solid ${theme.colors.dark[6]}`,
    borderTop: `2px solid ${theme.colors.dark[6]}`,
  },
}));

type Props = {
  book: BookWithNumChapters;
  lastChapterComplete: number;
};

type TranslateForm = {
  fromLanguage: WrLanguage;
  toLanguage: WrLanguage;
  phrase: string;
};

const FullBookView = ({ book, lastChapterComplete }: Props) => {
  const auth = useAuth();
  const { classes, cx } = useStyles();
  const [translateEnabled, { toggle: toggleTranslateEnabled }] =
    useDisclosure(false);
  const [selectedPage, setSelectedPage] = useState(
    Math.max(lastChapterComplete + 1, 1)
  );
  const [selectedChapter, setSelectedChapter] = useState(
    undefined as Chapter | undefined
  );
  const [languageSelectOpen, { toggle: toggleLanguageSelect }] =
    useDisclosure(false);

  const translateForm = useForm({
    initialValues: {
      fromLanguage: "en",
      toLanguage: "es",
      phrase: "",
    } as TranslateForm,
    validate: {
      phrase: (value) => (value ? null : "Translate phrase can not be empty"),
      toLanguage: (to, values) =>
        to === values.fromLanguage
          ? "From and to languages can't be the same"
          : null,
    },
  });

  const submitTranslate = (values: TranslateForm) => {
    console.log(values);
  };

  // get chapter
  useEffect(() => {
    getChapter(book.id, Math.max(selectedPage - 1, 0), auth.authToken)
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
              onChange={(value) => {
                if (value) {
                  const chapterNum = parseInt(value);
                  setSelectedPage(chapterNum);
                }
              }}
            />
            <Menu>
              <Menu.Target>
                <IconSettings />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={toggleTranslateEnabled}>
                  {translateEnabled
                    ? "Disable Translate Tool"
                    : "Enable Translate Tool"}
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
          <div className={translateEnabled ? cx(classes.sticky) : ""}>
            {translateEnabled ? (
              <form
                onSubmit={translateForm.onSubmit((values) =>
                  submitTranslate(values)
                )}
              >
                <Stack>
                  <TextInput
                    w="100%"
                    label={
                      <>
                        <Group position="left" spacing={0}>
                          <Text>
                            Translate (
                            <b>
                              {
                                prettyTranslateLanguages[
                                  translateForm.values.fromLanguage
                                ]
                              }
                            </b>{" "}
                            to{" "}
                            <b>
                              {
                                prettyTranslateLanguages[
                                  translateForm.values.toLanguage
                                ]
                              }
                            </b>
                            )
                          </Text>
                          <ActionIcon
                            radius="xl"
                            onClick={toggleLanguageSelect}
                          >
                            {languageSelectOpen ? (
                              <IconX size=".8rem" />
                            ) : (
                              <IconEdit size=".8rem" />
                            )}
                          </ActionIcon>
                        </Group>
                        {languageSelectOpen ? (
                          <>
                            <Group noWrap>
                              <Select
                                data={selectLanguageData}
                                size="xs"
                                {...translateForm.getInputProps("fromLanguage")}
                              />
                              <IconArrowRight />
                              <Select
                                data={selectLanguageData}
                                size="xs"
                                {...translateForm.getInputProps("toLanguage")}
                              />
                            </Group>
                            <Space h="xs" />
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    }
                    {...translateForm.getInputProps("phrase")}
                    rightSection={
                      <ActionIcon type="submit">
                        <IconBook2 size="1.5rem" strokeWidth="1" />
                      </ActionIcon>
                    }
                  />
                </Stack>
              </form>
            ) : (
              <></>
            )}
          </div>

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
