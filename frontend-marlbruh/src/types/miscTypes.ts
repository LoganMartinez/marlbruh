type DisclosureHandler = {
  readonly open: () => void;
  readonly close: () => void;
  readonly toggle: () => void;
};

type SubmitCommentForm = {
  commentText: string;
};
