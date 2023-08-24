type PiclePost = {
  id: number;
  author: User;
  content: string;
  caption: string;
  datePosted: Date;
  likes: User[];
};
