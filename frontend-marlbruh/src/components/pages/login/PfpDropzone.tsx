import {
  CloseButton,
  Group,
  Image,
  Stack,
  Text,
  rem,
  useMantineTheme,
} from "@mantine/core";
import {
  Dropzone,
  DropzoneProps,
  FileWithPath,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { errorNotification } from "../../../utilities/helperFunctions";
import { API_URL } from "../../../utilities/constants";

type PfpDropzoneProps = {
  value: FileWithPath | string | undefined;
  setValue: (file: FileWithPath | undefined) => void;
} & Partial<DropzoneProps>;

function PfpDropzone({ value, setValue, ...rest }: PfpDropzoneProps) {
  const theme = useMantineTheme();
  return (
    <>
      {value ? (
        <>
          <Stack align="flex-end">
            <CloseButton onClick={() => setValue(undefined)} />
            <Image
              src={
                typeof value === "string"
                  ? `${API_URL}${value}`
                  : URL.createObjectURL(value)
              }
              alt={typeof value === "string" ? value : value.name}
            />
          </Stack>
        </>
      ) : (
        <Dropzone
          onDrop={(files) => setValue(files[0])}
          onReject={() =>
            errorNotification(
              "that file can not be used. Be sure to use a png, jpg, or jpeg file"
            )
          }
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          maxFiles={1}
          {...rest}
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
              <IconPhoto size="3.2rem" stroke={1.5} />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Drag images here or click to select files
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                file should not exceed 5mb
              </Text>
            </div>
          </Group>
        </Dropzone>
      )}
    </>
  );
}

export default PfpDropzone;
