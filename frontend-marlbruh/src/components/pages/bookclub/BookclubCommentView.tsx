import { Container, Highlight, Title } from "@mantine/core";
import { useAuth } from "../../../authentication/AuthContext";
import UserPost from "../../reusableComponents/UserPost";
import {
  createBookclubReply,
  getBookclubReplies,
  likeBookclubComment,
} from "../../../api/apiCalls";
import { AxiosError } from "axios";
import { errorNotification } from "../../../utilities/helperFunctions";
import { useEffect, useState } from "react";
import LockedBookclubComment from "./LockedBookclubComment";

type Props = {
  comment: BookclubComment;
  setCommentsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  locked: boolean;
  unlockChapter: (chapterNumber: number) => void;
};

const BookclubCommentView = ({
  comment,
  setCommentsUpdated,
  locked,
  unlockChapter,
}: Props) => {
  const auth = useAuth();
  const [replies, setReplies] = useState([]);
  const [repliesUpdated, setRepliesUpdated] = useState(true);

  const toggleLike = () => {
    likeBookclubComment(comment.id, auth.authToken)
      .then(() => {
        setCommentsUpdated(true);
      })
      .catch((err: AxiosError) => {
        errorNotification(err.message);
      });
  };

  const toggleCommentLike = (commentId: number) => {
    console.log(commentId);
  };

  const submitComment = (values: SubmitCommentForm) => {
    createBookclubReply(comment.id, values.commentText, auth.authToken)
      .then(() => {
        setRepliesUpdated(true);
      })
      .catch((err: AxiosError) => {
        errorNotification(err.message);
      });
  };

  useEffect(() => {
    if (repliesUpdated) {
      getBookclubReplies(comment.id, auth.authToken)
        .then(({ data: res }) => {
          setReplies(res.reverse());
        })
        .catch((err: AxiosError) => {
          errorNotification(err.message);
        });
      setRepliesUpdated(false);
    }
  }, [repliesUpdated]);

  return (
    <>
      {locked && comment.author.userId !== auth.currentUser.userId ? (
        <LockedBookclubComment
          comment={comment}
          numberReplies={replies.length}
          unlockChapter={unlockChapter}
        />
      ) : (
        <UserPost
          author={comment.author}
          likes={comment.likes}
          toggleLike={toggleLike}
          caption={comment.comment}
          submitComment={submitComment}
          comments={replies}
          toggleCommentLike={toggleCommentLike}
        >
          <Container mih="10rem">
            <Title order={3}>Chapter {comment.chapterNumber + 1}</Title>
            <Highlight highlight={comment.highlighted}>
              {comment.passage}
            </Highlight>
          </Container>
        </UserPost>
      )}
    </>
  );
};

export default BookclubCommentView;
