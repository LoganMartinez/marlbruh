type Props = {
  pageContent: string;
  css: string;
};

const BookclubPage = ({ pageContent, css }: Props) => {
  return (
    <div className="embla__slide">
      <style>{css}</style>
      <div dangerouslySetInnerHTML={{ __html: pageContent }} />
    </div>
  );
};

export const splitChapter = (chapterContent: string, css: string) => {
  return [<BookclubPage pageContent={chapterContent} css={css} key={0} />];
};

export default BookclubPage;
