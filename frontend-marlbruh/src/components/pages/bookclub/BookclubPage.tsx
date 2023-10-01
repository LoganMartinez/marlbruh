import { px } from "@mantine/core";
import "../../../css/bookclub.css";

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
export const splitChapter = (
  chapterContent: string,
  css: string,
  pageHeight: string
) => {
  let [header, ...paragraphs] = chapterContent.split("<p");
  paragraphs = paragraphs.map((p) => "<p" + p);
  const offscreen = document.createElement("div");
  offscreen.className = "offscreenDiv";
  offscreen.innerHTML = `<style>${css}</style>${header}`;
  document.body.appendChild(offscreen);
  let offscreenRect = offscreen.getBoundingClientRect();
  let pages = [] as string[];
  let currentPage = header;
  for (let i = 0; i < paragraphs.length; ++i) {
    const currentP = paragraphs[i];
    offscreen.innerHTML += currentP;
    offscreenRect = offscreen.getBoundingClientRect();
    if (offscreenRect.height > px(pageHeight)) {
      pages.push(currentPage);
      currentPage = currentP;
      offscreen.innerHTML = `<style>${css}</style>`;
    } else {
      currentPage += currentP;
    }
  }
  offscreen.style.display = "none";

  return pages.map((page, index) => (
    <BookclubPage pageContent={page} css={css} key={index} />
  ));
};

export default BookclubPage;
