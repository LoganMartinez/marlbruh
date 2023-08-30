import { Button, Modal, Stack, Text } from "@mantine/core";

type Props = {
  opened: boolean;
  openHandlers: DisclosureHandler;
  unlockChapter: () => void;
};

const ConfirmFinishChapterModal = ({
  opened,
  openHandlers,
  unlockChapter,
}: Props) => {
  const confirm = () => {
    openHandlers.close();
    unlockChapter();
  };

  return (
    <Modal opened={opened} onClose={openHandlers.close} title="Confirm Unlock">
      <Stack>
        <Text>
          Comments may contain spoilers. Don't confirm unless you've already
          read the chapter. Note: you can still leave comments if you haven't
          unlocked the chapter.
        </Text>
        <Button w="100%" onClick={confirm}>
          Unlock
        </Button>
      </Stack>
    </Modal>
  );
};

export default ConfirmFinishChapterModal;
