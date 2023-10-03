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
  let [header, ...paragraphs] = chapterContent.split("<p");
  paragraphs = paragraphs.map((p) => "<p" + p);
  const offscreen = document.createElement("div");
  offscreen.className = "offscreenDiv";
  offscreen.innerHTML = `<style>${css}</style>${header}`;
  document.body.appendChild(offscreen);
  let offscreenRect = offscreen.getBoundingClientRect();
  let pages = [] as string[];
  let currentPage = header;
  const pRegex = /(?<ptag>\<p [^\>]*\>)(?<inner>.*)\<\/p\>/;
  const emptyHtmlRegex =
    /(\<(?<tag>[^p][^ ]*)[^\>]*\>\<\/\k<tag>\>)|(\<[^(\/\>)]+\/\>)/g;
  let i = 0;
  let isDone = false;

  const calculatePages = () => {
    /*
      Add paragraphs until offscreen reference exceeds page length, then do
      the same but with individual words of that paragraph
    */
    const currentP = paragraphs[i];
    let originalInnerHTML = offscreen.innerHTML;
    offscreen.innerHTML += currentP;
    offscreenRect = offscreen.getBoundingClientRect();
    if (offscreenRect.height > px(pageHeight)) {
      offscreen.innerHTML = originalInnerHTML;
      const reg = currentP.match(pRegex);
      const ptag = reg?.groups?.ptag ? reg.groups.ptag : "";
      const words = reg?.groups?.inner
        ? reg.groups.inner.replace(emptyHtmlRegex, "").split(" ")
        : [];
      let currentAddition = ptag;
      for (let j = 0; j < words.length; ++j) {
        const originalAddition = currentAddition;
        currentAddition += words[j] + " ";
        offscreen.innerHTML += `${currentAddition}</p>`;
        offscreenRect = offscreen.getBoundingClientRect();
        if (offscreenRect.height <= px(pageHeight)) {
          offscreen.innerHTML = originalInnerHTML;
        } else {
          if (j === 0) {
            paragraphs[i] = `${ptag}${words.join(" ")}</p>`;
          } else {
            currentPage += `${originalAddition}</p>`;
            // break up paragraph across pages -> remove indent
            paragraphs[i] = `${ptag.slice(0, -1)} style="text-indent:0">${words
              .slice(j)
              .join(" ")}</p>`;
          }
          // decrement i so it will deal with the leftovers next loop
          --i;
          break;
        }
      }

      pages.push(currentPage);
      currentPage = "";
      offscreen.innerHTML = `<style>${css}</style>`;
      ++i;
    } else {
      currentPage += currentP;
      ++i;
    }
    if (i === paragraphs.length) {
      isDone = true;
    } else {
      setTimeout(calculatePages, 0);
    }
  };

  calculatePages();

  while (!isDone) {
    await new Promise((resolve) => setTimeout(resolve, 0));
  }

  if (currentPage != "") {
    pages.push(currentPage);
  }
  offscreen.innerHTML = "";
  offscreen.style.display = "none";

  return pages.map((page, index) => (
    <BookclubPage pageContent={page} css={css} key={index} />
  ));
}

export default BookclubPage;
