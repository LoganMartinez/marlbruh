import { Image } from "@mantine/core";
import { useAuth } from "../../../authentication/AuthContext";
import {
  createComment,
  getComments,
  likePicleComment,
  likePiclePost,
} from "../../../api/apiCalls";
import { AxiosError } from "axios";
import { errorNotification } from "../../../utilities/helperFunctions";
import { useEffect, useState } from "react";
import UserPost from "../../reusableComponents/UserPost";

type Props = {
  post: PiclePost;
  postsUpdated: boolean;
  setPostsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

const PiclePost = ({ post, postsUpdated, setPostsUpdated }: Props) => {
  const auth = useAuth();
  const [comments, setComments] = useState([] as PicleComment[]);
  const [commentsUpdated, setCommentsUpdated] = useState(true);

  const toggleLike = () => {
    likePiclePost(post.id, auth.authToken)
      .then(() => {
        setPostsUpdated(true);
      })
      .catch((err: AxiosError) => {
        errorNotification(err.message);
      });
  };

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
  }, [commentsUpdated]);

  useEffect(() => {
    if (postsUpdated) {
      setCommentsUpdated(true);
    }
  }, [postsUpdated]);

  return (
    <>
      <UserPost
        author={post.author}
        caption={post.caption}
        likes={post.likes}
        toggleLike={toggleLike}
        comments={comments}
        submitComment={submitComment}
        toggleCommentLike={toggleCommentLike}
      >
        <Image radius="xl" src={post.content} />
      </UserPost>
    </>
  );
};

export default PiclePost;
