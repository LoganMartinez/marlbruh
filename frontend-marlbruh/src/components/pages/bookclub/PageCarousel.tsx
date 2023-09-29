import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import "../../../css/embla.css";
import { ActionIcon, Group, createStyles, px, rem } from "@mantine/core";
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
  startPage: number;
  setNumPages: React.Dispatch<React.SetStateAction<number>>;
  height: number;
};

const PageCarousel = ({
  chapterContent,
  css,
  width,
  setCurrentPage,
  startPage,
  setNumPages,
  height,
}: Props) => {
  const [loading, setLoading] = useState(true);
  const { classes, cx } = useStyles();
  const [pages, setPages] = useState([] as JSX.Element[]);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: startPage,
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

  const onInit = useCallback(() => {}, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    const page = emblaApi.selectedScrollSnap();
    setCurrentPage(page);
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
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
    const pgs = splitChapter(
      chapterContent,
      cssWithoutBodyMargins,
      rem(height - 70 - 60)
    );
    setPages(pgs);
    setNumPages(pgs.length);
    setLoading(false);
  }, []);

  return (
    <>
      {!loading ? (
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
        <></>
      )}
    </>
  );
};

export default PageCarousel;
