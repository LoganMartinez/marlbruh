import { Button, Modal, Stack, Text } from "@mantine/core";
import { useAuth } from "../../../authentication/AuthContext";
import { deleteChore } from "../../../api/apiCalls";
import { successNotification } from "../../../utilities/helperFunctions";

type Props = {
  chore: Chore;
  opened: boolean;
  openHandlers: DisclosureHandler;
  setChoresUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteChoreConfirmation = ({
  chore,
  opened,
  openHandlers,
  setChoresUpdated,
}: Props) => {
  const auth = useAuth();

  const confirmDeletion = () => {
    deleteChore(chore.id, auth.authToken)
      .then(() => {
        successNotification(`Successfully deleted chore "${chore.name}"`);
        setChoresUpdated(true);
      })
      .catch((err) => {
        successNotification(err);
      })
      .finally(() => openHandlers.close());
  };
  return (
    <Modal
      opened={opened}
      onClose={openHandlers.close}
      title="Confirm Deletion"
    >
      <Stack>
        <Text>Are you sure you want to delete "{chore.name}"?</Text>
        <Button onClick={confirmDeletion}>Delete</Button>
      </Stack>
    </Modal>
  );
};

export default DeleteChoreConfirmation;
