import {
  Button,
  CloseButton,
  Group,
  Modal,
  Stack,
  Text,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { errorNotification } from "../../../utilities/helperFunctions";
import { IconBook, IconUpload, IconX } from "@tabler/icons-react";
import { useAuth } from "../../../authentication/AuthContext";
import { useForm } from "@mantine/form";
import { addBook } from "../../../api/apiCalls";

type Props = {
  opened: boolean;
  openHandlers: DisclosureHandler;
  setBooksUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

type Form = {
  book: FileWithPath | undefined;
};

const AddBookModal = ({ opened, openHandlers, setBooksUpdated }: Props) => {
  const auth = useAuth();
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      book: undefined,
    } as Form,
    validate: {
      book: (value) => (value ? null : ".epub file required"),
    },
  });

  const submitForm = (values: Form) => {
    if (values.book) {
      addBook(values.book, auth.authToken)
        .then(() => {
          openHandlers.close();
          setBooksUpdated(true);
        })
        .catch(({ data: err }) => {
          errorNotification(err.message);
        });
    }
  };

  return (
    <form onSubmit={form.onSubmit((values) => submitForm(values))}>
      <Modal opened={opened} onClose={openHandlers.close} title="Add Book">
        {form.values.book ? (
          <>
            <Stack>
              <Group align="flex-end">
                <Text>{form.values.book.name}</Text>
                <CloseButton
                  onClick={() => form.setFieldValue("book", undefined)}
                />
              </Group>
              <Button onClick={() => submitForm(form.values)}>Upload</Button>
            </Stack>
          </>
        ) : (
          <Dropzone
            onDrop={(file) => form.setFieldValue("book", file[0])}
            onReject={() =>
              errorNotification(
                "that file can not be used. Be sure to use an epub file"
              )
            }
            maxSize={3 * 1024 ** 2}
            accept={["application/epub+zip"]}
            maxFiles={1}
          >
            <Group
              position="center"
              spacing="xl"
              style={{ minHeight: rem(220), pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <IconUpload
                  size="3.2rem"
                  stroke={1.5}
                  color={
                    theme.colors[theme.primaryColor][
                      theme.colorScheme === "dark" ? 4 : 6
                    ]
                  }
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  size="3.2rem"
                  stroke={1.5}
                  color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconBook size="3.2rem" stroke={1.5} />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Drag book files here or click to select files
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                  files should be .epub
                </Text>
              </div>
            </Group>
          </Dropzone>
        )}
      </Modal>
    </form>
  );
};

export default AddBookModal;
