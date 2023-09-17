import {
  ActionIcon,
  Box,
  CloseButton,
  Divider,
  Grid,
  Group,
  Loader,
  ScrollArea,
  Select,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
  Transition,
  createStyles,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  WrLanguage,
  prettyTranslateLanguages,
  selectLanguageData,
} from "../../../utilities/constants";
import { wrTranslate } from "../../../api/apiCalls";
import { useAuth } from "../../../authentication/AuthContext";
import React, { useEffect, useState } from "react";
import { errorNotification } from "../../../utilities/helperFunctions";
import { AxiosError } from "axios";
import {
  useDisclosure,
  useLocalStorage,
  useTextSelection,
} from "@mantine/hooks";
import {
  IconArrowRight,
  IconBook2,
  IconEdit,
  IconX,
} from "@tabler/icons-react";

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
    zIndex: 100,
  },

  wrSticky: {
    position: "sticky",
    top: "0px",
    width: "100%",
    paddingTop: "1rem",
    paddingBottom: "2rem",
    paddingLeft: "0px",
    paddingRight: "0px",
    backgroundColor: theme.colors.dark[7],
    borderBottom: `2px solid ${theme.colors.dark[5]}`,
  },

  exampleSentence: {
    color: theme.colors.dark[2],
  },
}));

type Props = {
  enabled: boolean;
};

type TranslateForm = {
  fromLanguage: WrLanguage;
  toLanguage: WrLanguage;
  phrase: string;
};

const TranslateTool = ({ enabled }: Props) => {
  const auth = useAuth();
  const { classes, cx } = useStyles();
  const [translationRes, setTranslationRes] = useState(
    undefined as TranslationResponse | undefined
  );
  const [languageSelectOpen, { toggle: toggleLanguageSelect }] =
    useDisclosure(false);
  const [tranlationLoading, setTranslationLoading] = useState(false);
  const [storedFromLang, setStoredFromLang] = useLocalStorage({
    key: "marlbruh-from-lang",
    defaultValue: "en" as WrLanguage,
  });
  const [storedToLang, setStoredToLang] = useLocalStorage({
    key: "marlbruh-to-lang",
    defaultValue: "es" as WrLanguage,
  });
  const textSelection = useTextSelection();
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
  const [translationResOpen, setTranslationResOpen] = useState(false);

  const submitTranslate = (values: TranslateForm) => {
    setTranslationLoading(true);
    setStoredFromLang(values.fromLanguage);
    setStoredToLang(values.toLanguage);
    wrTranslate(
      values.fromLanguage,
      values.toLanguage,
      values.phrase,
      auth.authToken
    )
      .then(({ data: res }: { data: TranslationResponse }) => {
        setTranslationRes(res);
        setTranslationResOpen(true);
      })
      .catch((err: AxiosError) => {
        errorNotification(err.message);
      })
      .finally(() => setTranslationLoading(false));
  };

  useEffect(() => {
    translateForm.setFieldValue("fromLanguage", storedFromLang);
  }, [storedFromLang]);
  useEffect(() => {
    translateForm.setFieldValue("toLanguage", storedToLang);
  }, [storedToLang]);

  useEffect(() => {
    if (textSelection?.toString()) {
      translateForm.setFieldValue("phrase", textSelection.toString());
    }
  }, [textSelection?.toString()]);

  return (
    <div className={enabled ? cx(classes.sticky) : ""}>
      {enabled ? (
        <form
          onSubmit={translateForm.onSubmit((values) => submitTranslate(values))}
        >
          <Stack>
            <TextInput
              w="100%"
              label={
                <>
                  <Group position="left" spacing={0} noWrap>
                    <Text fz="xs">
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
                    <ActionIcon radius="xl" onClick={toggleLanguageSelect}>
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
                tranlationLoading ? (
                  <Loader size="xs" />
                ) : (
                  <ActionIcon type="submit">
                    <IconBook2 size="1.5rem" strokeWidth="1" />
                  </ActionIcon>
                )
              }
            />
            <Transition
              mounted={translationResOpen}
              transition="scale-y"
              duration={300}
            >
              {(styles) => (
                <div style={styles}>
                  {translationRes ? (
                    <Box
                      sx={(theme) => ({
                        backgroundColor: theme.colors.dark[7],
                      })}
                    >
                      <ScrollArea h={400}>
                        <Stack>
                          <Group
                            position="apart"
                            p="xs"
                            className={cx(classes["wrSticky"])}
                          >
                            <Title order={3}>{translationRes?.word}</Title>
                            <CloseButton
                              onClick={() => setTranslationResOpen(false)}
                            />
                          </Group>

                          {translationRes?.translations.length > 0 ? (
                            <>
                              {translationRes.translations.map(
                                (group, index) => (
                                  <React.Fragment key={index}>
                                    <Divider size="lg" />
                                    <Title order={4} pl="1rem">
                                      {group.title}
                                    </Title>
                                    {group.entries.map((entry, index) => (
                                      <React.Fragment key={index}>
                                        <Divider variant="dashed" />
                                        <Grid key={index} p="xs">
                                          <Grid.Col span={6}>
                                            {entry.from_word.source}
                                          </Grid.Col>
                                          <Grid.Col span={6}>
                                            {entry.context}
                                          </Grid.Col>
                                          <Grid.Col span={6}>
                                            {entry.to_word.map((word) =>
                                              word.notes
                                                ? `(${word.notes}) `
                                                : ""
                                            )}
                                          </Grid.Col>
                                          <Grid.Col span={6}>
                                            {entry.to_word
                                              .map((word) => word.meaning)
                                              .join(", ")}
                                          </Grid.Col>
                                          <Grid.Col span={12}>
                                            <Text
                                              className={cx(
                                                classes.exampleSentence
                                              )}
                                              fz="xs"
                                            >
                                              {entry.from_example}
                                            </Text>
                                          </Grid.Col>
                                          <Grid.Col span={12}>
                                            <Text
                                              className={cx(
                                                classes.exampleSentence
                                              )}
                                              fz="xs"
                                            >
                                              {entry.to_example}
                                            </Text>
                                          </Grid.Col>
                                        </Grid>
                                      </React.Fragment>
                                    ))}
                                  </React.Fragment>
                                )
                              )}
                            </>
                          ) : (
                            <>
                              <Divider />
                              <Title order={4}>No Translations Found</Title>
                            </>
                          )}
                        </Stack>
                      </ScrollArea>
                    </Box>
                  ) : (
                    <></>
                  )}
                </div>
              )}
            </Transition>
          </Stack>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TranslateTool;
