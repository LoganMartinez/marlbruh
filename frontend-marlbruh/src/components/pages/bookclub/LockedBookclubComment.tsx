import {
  ActionIcon,
  Box,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { profileColors } from "../../../utilities/constants";
import {
  IconHeart,
  IconLock,
  IconLockOpen,
  IconMessage,
} from "@tabler/icons-react";
import UserHandle from "../../reusableComponents/UserHandle";
import { useDisclosure, useHover } from "@mantine/hooks";
import ConfirmFinishChapterModal from "./ConfirmFinishChapterModal";

type Props = {
  comment: BookclubComment;
  numberReplies: number;
  unlockChapter: () => void;
};

const LockedBookclubComment = ({
  comment,
  numberReplies,
  unlockChapter,
}: Props) => {
  const { hovered: lockHovered, ref: hoverRef } = useHover();
  const [confirmModalOpen, confirmModalHandlers] = useDisclosure(false);
  return (
    <>
      <ConfirmFinishChapterModal
        opened={confirmModalOpen}
        openHandlers={confirmModalHandlers}
        unlockChapter={unlockChapter}
      />
      <Box
        sx={(theme) => ({
          backgroundColor: profileColors[comment.author.profileColor],
          borderRadius: theme.radius.lg,
        })}
      >
        <Container p="md">
          <Stack align="center">
            <Title>Locked</Title>
            <Text>
              This comment may contain spoilers! Click the lock to unlock the
              comments for this chapter.
            </Text>
            <div ref={hoverRef}>
              <ActionIcon
                size="10rem"
                variant="unstyled"
                onClick={confirmModalHandlers.open}
              >
                {lockHovered ? (
                  <IconLockOpen size="100%" />
                ) : (
                  <IconLock size="100%" />
                )}
              </ActionIcon>
            </div>

            <Group position="apart" w="100%" align="flex-end">
              <UserHandle user={comment.author} />
              <Stack>
                <Group>
                  <IconHeart />
                  <Text>{comment.likes.length}</Text>
                </Group>
                <Group>
                  <IconMessage />
                  <Text>{numberReplies}</Text>
                </Group>
              </Stack>
            </Group>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default LockedBookclubComment;
