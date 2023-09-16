type PostComment = {
  id: number;
  author: User;
  content: string;
  likes: User[];
  datePosted: Date;
  originalPostId: number;
};

type PostView = "post" | "likes" | "comments";
