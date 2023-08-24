import { Button, Modal, Stack, Text, Textarea } from "@mantine/core";
import PfpDropzone from "../login/PfpDropzone";
import { useForm } from "@mantine/form";
import { FileWithPath } from "@mantine/dropzone";
import { createPiclePost } from "../../../api/apiCalls";
import { useAuth } from "../../../authentication/AuthContext";
import {
  errorNotification,
  successNotification,
} from "../../../utilities/helperFunctions";
import { AxiosError } from "axios";
import React from "react";

type Props = {
  opened: boolean;
  openHandlers: DisclosureHandler;
  setPostsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

type Form = {
  content: FileWithPath | undefined;
  caption: string;
};

const PiclePostCreationModal = ({
  opened,
  openHandlers,
  setPostsUpdated,
}: Props) => {
  const auth = useAuth();
  const form = useForm({
    initialValues: {
      content: undefined,
      caption: "",
    } as Form,

    validate: {
      content: (value) => (value ? null : "Picture is required"),
      caption: (value) => (value ? null : "Caption is required"),
    },
  });

  const submitForm = (values: Form) => {
    if (!values.content) {
      return;
    }
    createPiclePost(values.content, values.caption, auth.authToken)
      .then(({ data: createdPost }) => {
        successNotification(`post made: "${createdPost.caption}"`);
        setPostsUpdated(true);
        openHandlers.close();
      })
      .catch((err: AxiosError) => {
        errorNotification(err.message);
      });
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        form.reset();
        openHandlers.close();
      }}
      title="Create Pic-le post"
    >
      <form onSubmit={form.onSubmit((values) => submitForm(values))}>
        <Stack>
          <div>
            <Text>Picture</Text>
            <PfpDropzone
              value={form.values.content}
              setValue={(value) => form.setFieldValue("content", value)}
            />
          </div>

          <Textarea label="Caption" {...form.getInputProps("caption")} />
          <div>
            <Button type="submit" w="100%">
              Create
            </Button>
            {form.errors.content ? (
              <Text size="xs" color="red">
                {form.errors.content}
              </Text>
            ) : (
              <></>
            )}
          </div>
        </Stack>
      </form>
    </Modal>
  );
};

export default PiclePostCreationModal;
