import { Loader, Pagination } from "@mantine/core";
import { useEffect, useState } from "react";
import { getChapter } from "../../../api/apiCalls";
import { useAuth } from "../../../authentication/AuthContext";
import { errorNotification } from "../../../utilities/helperFunctions";
import { AxiosError } from "axios";
import { useViewportSize } from "@mantine/hooks";

type Props = {
  book: BookWithNumChapters;
  lastChapterComplete: number;
};

const FullBookView = ({ book, lastChapterComplete }: Props) => {
  const auth = useAuth();
  const windowWidth = useViewportSize().width;
  const [selectedPage, setSelectedPage] = useState(
    Math.max(lastChapterComplete + 1, 1)
  );
  const [selectedChapter, setSelectedChapter] = useState(
    undefined as Chapter | undefined
  );

  // get chapter
  useEffect(() => {
    getChapter(book.id, Math.max(selectedPage - 1, 0), auth.authToken)
      .then(({ data: chapter }) => {
        setSelectedChapter(chapter);
      })
      .catch((err: AxiosError) => {
        errorNotification(err.message);
      });
  }, [selectedPage, book]);

  return (
    <>
      {selectedChapter ? (
        <>
          <Pagination
            total={book.numChapters}
            siblings={1}
            size={windowWidth > 500 ? "md" : "xs"}
            value={selectedPage}
            onChange={(page) => setSelectedPage(page)}
          />
          <div>
            <style>{book.cssStyles}</style>
            <div
              dangerouslySetInnerHTML={{ __html: selectedChapter.content }}
            />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default FullBookView;
