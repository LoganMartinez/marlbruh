import { Image } from "@mantine/core";
import { useAuth } from "../../../authentication/AuthContext";
import {
  createComment,
  getComments,
  likePicleComment,
} from "../../../api/apiCalls";
import { AxiosError } from "axios";
import { errorNotification } from "../../../utilities/helperFunctions";
import { useEffect, useState } from "react";
import UserPost from "../../reusableComponents/UserPost";
import { useIntersection } from "@mantine/hooks";

type Props = {
  post: PiclePost;
  onEnterScreen: () => void;
};

const PiclePost = ({ post, onEnterScreen }: Props) => {
  const [hasEnteredScreen, setHasEnteredScreen] = useState(false);
  const auth = useAuth();
  const [comments, setComments] = useState([] as PicleComment[]);
  const [commentsUpdated, setCommentsUpdated] = useState(true);
  const { ref, entry } = useIntersection({
    threshold: 1,
  });

  const toggleCommentLike = (commentId: number) => {
    likePicleComment(commentId, auth.authToken)
      .then(() => {
        setCommentsUpdated(true);
      })
      .catch((err: AxiosError) => {
        errorNotification(err.message);
      });
  };

  const submitComment = (values: SubmitCommentForm) => {
    createComment(post.id, values.commentText, auth.authToken)
      .then(() => {
        setCommentsUpdated(true);
      })
      .catch((err: AxiosError) => {
        errorNotification(err.message);
      });
  };

  useEffect(() => {
    if (commentsUpdated) {
      getComments(post.id, auth.authToken).then(({ data: comments }) => {
        setComments(comments.reverse());
        setCommentsUpdated(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentsUpdated]);

  useEffect(() => {
    if (!hasEnteredScreen && entry?.isIntersecting) {
      onEnterScreen();
      setHasEnteredScreen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry]);

  return (
    <div>
      <div ref={ref} />
      <UserPost
        id={post.id}
        author={post.author}
        caption={post.caption}
        likes={post.likes}
        comments={comments}
        submitComment={submitComment}
        toggleCommentLike={toggleCommentLike}
      >
        <Image radius="xl" src={post.content} />
      </UserPost>
    </div>
  );
};

export default PiclePost;
