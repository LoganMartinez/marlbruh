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
export async function splitChapter(
  chapterContent: string,
  css: string,
  pageHeight: string
) {
  const offscreen = document.createElement("div");
  offscreen.className = "offscreenDiv";
  document.body.appendChild(offscreen);
  let offscreenRect = offscreen.getBoundingClientRect();
  let offscreenStyle = window.getComputedStyle(offscreen);
  let pages = [] as string[];
  const htmlRegex =
    /(?<before>[^\<]*)(((\<(?<elem>[^ ]+)( (?<style>[^\>]+))?\>(?<innerhtml>.*?)\<\/\k<elem>\>)|((?<selfClosingElem>\<[^(\/|\>)]+\/\>)))(?<after>.*))?/s;
  let isDone = false;
  let content = chapterContent;

  const pageTooBig = (section: string) => {
    offscreen.innerHTML = `<style>${css}</style><div>.</div>${section}`;
    offscreenRect = offscreen.getBoundingClientRect();
    offscreenStyle = window.getComputedStyle(offscreen);
    const margins =
      parseFloat(offscreenStyle.marginTop) +
      parseFloat(offscreenStyle.marginBottom);
    const ret = offscreenRect.height + margins > px(pageHeight);
    return ret;
  };

  const calculatePage = (
    content: string,
    closeTags: string,
    page: string
  ): string[] => {
    const reg = content.match(htmlRegex);
    const before = reg?.groups?.before || "";
    const after = reg?.groups?.after || "";
    const selfClosingElem = reg?.groups?.selfClosingElem || "";
    const openElem = reg?.groups?.elem
      ? `<${reg.groups.elem}${
          reg?.groups?.style ? ` ${reg.groups.style}` : ""
        }>`
      : "";
    const innerhtml = reg?.groups?.innerhtml || "";
    const closeElem = reg?.groups?.elem ? `</${reg.groups.elem}>` : "";
    if (before !== "") {
      const rest = openElem + innerhtml + closeElem + selfClosingElem + after;
      let newPage = page + before + closeTags;
      if (pageTooBig(newPage)) {
        const words = before.split(" ");
        let i = words.length - 1;
        let wordsToNotAdd = [...words];
        // remove words until it doesn't overflow
        while (pageTooBig(newPage) && i > 0) {
          wordsToNotAdd = [...words];
          const wordsToAdd = wordsToNotAdd.splice(0, i);
          newPage = page + wordsToAdd.join(" ") + closeTags;
          --i;
        }
        if (i == 0) {
          // entire content overflows
          return [content, page + closeTags];
        } else {
          return [wordsToNotAdd.join(" ") + rest + closeTags, newPage];
        }
      }
      const newContent = rest + closeTags;
      return calculatePage(newContent, closeTags, newPage);
    }

    if (selfClosingElem !== "") {
      const newPage = page + selfClosingElem + closeTags;
      if (pageTooBig(newPage)) {
        return [content, page];
      }
      return calculatePage(after, closeTags, newPage);
    }

    if (openElem !== "") {
      const newPage = page + openElem + innerhtml + closeElem;
      if (pageTooBig(newPage)) {
        // have to split up innerhtml
        const [remainingContent, finalPage] = calculatePage(
          innerhtml,
          closeElem + closeTags,
          page + openElem
        );
        return [openElem + remainingContent + after, finalPage];
      }
      return calculatePage(after, closeTags, newPage);
    }
    return [content, page];
  };

  const calculatePages = () => {
    const [remainingContent, page] = calculatePage(
      content,
      "",
      `<style>${css}</style>
      `
    );
    if (remainingContent === content) {
      isDone = true;
    } else {
      content = remainingContent;
      pages.push(page);
      setTimeout(calculatePages, 0);
    }
  };

  calculatePages();

  while (!isDone) {
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  offscreen.remove();
  offscreen.style.display = "none";

  return pages.map((page, index) => (
    <BookclubPage pageContent={page} css={css} key={index} />
  ));
}

export default BookclubPage;
