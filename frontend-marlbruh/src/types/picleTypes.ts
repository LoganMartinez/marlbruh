type PiclePost = {
  id: number;
  author: User;
  content: string;
  caption: string;
  datePosted: Date;
  likes: User[];
};

type PicleComment = {
  id: number;
  author: User;
  content: string;
  likes: User[];
  datePosted: Date;
  originalPostId: number;
};

type PiclePostView = "post" | "likes" | "comments";
