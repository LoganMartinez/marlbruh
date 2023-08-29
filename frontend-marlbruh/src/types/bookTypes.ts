interface Book {
  id: number;
  title: string;
  coverImage: string;
}

interface BookWithNumChapters extends Book {
  numChapters: number;
}

type Chapter = {
  id: number;
  book: Book;
  chapterNumber: number;
  content: string;
};

type BookclubComment = {
  id: number;
  author: User;
  likes: User[];
  passage: string;
  comment: string;
  highlighted: string;
};
