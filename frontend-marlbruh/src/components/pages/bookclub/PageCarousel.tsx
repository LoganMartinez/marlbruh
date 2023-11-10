import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import "../../../css/embla.css";
import {
  ActionIcon,
  Group,
  Loader,
  createStyles,
  px,
  rem,
} from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { splitChapter } from "./BookclubPage";

const useStyles = createStyles((theme) => ({
  pageButtons: {
    position: "fixed",
    bottom: "2rem",
    right: "2rem",
    backgroundColor: theme.colors.blue[7],
    borderRadius: theme.radius.xl,
    padding: ".5rem",
  },
}));

type Props = {
  chapterContent: string;
  css: string;
  width: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  startPagePercent: number;
  setNumPages: React.Dispatch<React.SetStateAction<number>>;
  height: number;
};

const PageCarousel = ({
  chapterContent,
  css,
  width,
  setCurrentPage,
  startPagePercent,
  setNumPages,
  height,
}: Props) => {
  const { classes, cx } = useStyles();
  const [pages, setPages] = useState([] as JSX.Element[]);
  const [chapterLoading, setChapterLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    watchDrag: false,
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  const setInitial = (slide: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(slide);
    }
  };

  const onInit = useCallback(() => {}, []);
  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    const page = emblaApi.selectedScrollSnap();
    if (pages.length > 0) {
      setCurrentPage(page / pages.length);
    }
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [pages]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
    setInitial(Math.floor(startPagePercent * pages.length))
  }, [emblaApi, onInit, onSelect]);

  let cssWithoutBodyMargins = css;
  const bodyRegex = /body[^\{]*\{[^\}]*\}/;
  const body = css.match(bodyRegex);
  if (body && body.length > 0) {
    const marginRegex = /margin[^;]*;/g;
    const bodyWithoutMargins = body[0].replace(marginRegex, "");
    cssWithoutBodyMargins = cssWithoutBodyMargins.replace(
      body[0],
      bodyWithoutMargins
    );
  }

  useEffect(() => {
    setChapterLoading(true);
    async function updatePages() {
      const pgs = await splitChapter(
        chapterContent,
        cssWithoutBodyMargins,
        rem(height - px("6rem"))
      );
      setPages(pgs);
      setNumPages(pgs.length);

      setChapterLoading(false);
      setNextBtnDisabled(startPagePercent === 1);
      setPrevBtnDisabled(startPagePercent === 0);
    }
    updatePages();
  }, [chapterContent]);

  return (
    <>
      {!chapterLoading ? (
        <div className="embla">
          <div
            className="embla__viewport"
            ref={emblaRef}
            style={{ width: width - px("2rem") }}
          >
            <div className="embla__container">{pages}</div>
          </div>
          <div className={cx(classes["pageButtons"])}>
            <Group spacing="xs">
              <ActionIcon
                variant="transparent"
                disabled={prevBtnDisabled}
                onClick={scrollPrev}
              >
                <IconArrowLeft />
              </ActionIcon>
              <ActionIcon
                variant="transparent"
                disabled={nextBtnDisabled}
                onClick={scrollNext}
              >
                <IconArrowRight />
              </ActionIcon>
            </Group>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default PageCarousel;
