import { Button, Modal, Stack, Text } from "@mantine/core";
import { updateChores } from "../../../api/apiCalls";
import { useAuth } from "../../../authentication/AuthContext";
import { successNotification } from "../../../utilities/helperFunctions";

type Props = {
  opened: boolean;
  openHandlers: DisclosureHandler;
  chores: Chore[];
  setChoresUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChoresResetModal = ({
  opened,
  openHandlers,
  chores,
  setChoresUpdated,
}: Props) => {
  const auth = useAuth();
  const confirmClick = () => {
    updateChores(
      chores.map((chore) => chore.id),
      auth.authToken,
      undefined,
      undefined,
      [],
      false,
      undefined
    ).then(() => {
      openHandlers.close();
      successNotification("Chores reset!");
      setChoresUpdated(true);
    });
  };

  return (
    <Modal
      title={<b>Reset ALL Chores</b>}
      opened={opened}
      onClose={() => openHandlers.close()}
    >
      <Stack>
        <Text>
          Are you sure you want to reset the chores? This action will set all
          chores to unassigned and incomplete.
        </Text>
        <Button w="100%" onClick={confirmClick}>
          Yes I'm Sure
        </Button>
      </Stack>
    </Modal>
  );
};

export default ChoresResetModal;
