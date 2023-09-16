interface Book {
  id: number;
  title: string;
  coverImage: string;
  cssStyles: string;
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

interface BookclubCommentBase {
  id: number;
  author: User;
  likes: User[];
  passage: string;
  comment: string;
  chapterNumber: number;
}

interface BookclubCommentNotFormatted extends BookclubCommentBase {
  highlighted: string;
}

interface BookclubComment extends BookclubCommentBase {
  highlighted: string[];
}

type BookUserRelation = {
  id: number;
  lastChapterComplete: number;
  user: number;
  book: number;
};
