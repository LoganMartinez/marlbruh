import { Button, Modal, Stack, Text } from "@mantine/core";

type Props = {
  chore: Chore;
  opened: boolean;
  openHandlers: DisclosureHandler;
};

const DeleteChoreConfirmation = ({ chore, opened, openHandlers }: Props) => {
  return (
    <Modal
      opened={opened}
      onClose={openHandlers.close}
      title="Confirm Deletion"
    >
      <Stack>
        <Text>Are you sure you want to delete "{chore.name}"?</Text>
        <Button>Delete</Button>
      </Stack>
    </Modal>
  );
};

export default DeleteChoreConfirmation;
