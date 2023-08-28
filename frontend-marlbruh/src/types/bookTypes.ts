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
