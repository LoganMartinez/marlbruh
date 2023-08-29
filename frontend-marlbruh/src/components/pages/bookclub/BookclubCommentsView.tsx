import { Highlight } from "@mantine/core";
import { useAuth } from "../../../authentication/AuthContext";
import UserPost from "../../reusableComponents/UserPost";
import { likeBookclubComment } from "../../../api/apiCalls";
import { AxiosError } from "axios";
import { errorNotification } from "../../../utilities/helperFunctions";

type Props = {
  comment: BookclubComment;
  setCommentsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

const BookclubCommentView = ({ comment, setCommentsUpdated }: Props) => {
  const auth = useAuth();

  const toggleLike = () => {
    likeBookclubComment(comment.id, auth.authToken)
      .then(() => {
        setCommentsUpdated(true);
      })
      .catch((err: AxiosError) => {
        errorNotification(err.message);
      });
  };

  const submitComment = (values: SubmitCommentForm) => {
    console.log(values);
  };

  return (
    <UserPost
      author={comment.author}
      likes={comment.likes}
      toggleLike={toggleLike}
      caption={comment.comment}
      submitComment={submitComment}
      comments={[]}
    >
      <Highlight highlight="">{comment.passage}</Highlight>
    </UserPost>
  );
};

export default BookclubCommentView;
