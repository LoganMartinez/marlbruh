import {
  Box,
  Container,
  Group,
  Highlight,
  SimpleGrid,
  Stack,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { getBookclubComments } from "../../../api/apiCalls";
import { useAuth } from "../../../authentication/AuthContext";
import { AxiosError } from "axios";
import { errorNotification } from "../../../utilities/helperFunctions";
import { profileColors } from "../../../utilities/constants";
import PicleUserText from "../../reusableComponents/UserText";
import { IconHeart } from "@tabler/icons-react";

type Props = {
  chapter: Chapter;
  commentsUpdated: boolean;
  setCommentsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

const BookclubCommentView = ({
  chapter,
  commentsUpdated,
  setCommentsUpdated,
}: Props) => {
  const auth = useAuth();
  const [comments, setComments] = useState([] as BookclubComment[]);

  useEffect(() => {
    if (commentsUpdated) {
      getBookclubComments(
        chapter.book.id,
        chapter.chapterNumber,
        auth.authToken
      )
        .then(({ data: comments }) => {
          setComments(comments);
        })
        .catch((err: AxiosError) => {
          errorNotification(err.message);
        });
      setCommentsUpdated(false);
    }
  }, [commentsUpdated]);

  return (
    <SimpleGrid
      cols={3}
      breakpoints={[
        { maxWidth: "62rem", cols: 3, spacing: "md" },
        { maxWidth: "48rem", cols: 2, spacing: "sm" },
        { maxWidth: "36rem", cols: 1, spacing: "sm" },
      ]}
    >
      {comments.map((comment) => (
        <Box
          sx={(theme) => ({
            backgroundColor: profileColors[comment.author.profileColor],
            borderRadius: theme.radius.lg,
          })}
          key={comment.id}
        >
          <Container p="md">
            <Stack>
              <Highlight highlight="">{comment.passage}</Highlight>
              <Group position="apart" noWrap align="flex-start" spacing="xs">
                <PicleUserText
                  user={comment.author}
                  content={comment.comment}
                />
                <IconHeart />
              </Group>
            </Stack>
          </Container>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default BookclubCommentView;
