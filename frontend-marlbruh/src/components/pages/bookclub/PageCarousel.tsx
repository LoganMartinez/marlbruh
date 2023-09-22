import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import "../../../css/embla.css";
import { ActionIcon, Group, createStyles, px } from "@mantine/core";
import {
  IconArrowBarToUp,
  IconArrowLeft,
  IconArrowRight,
} from "@tabler/icons-react";

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
  pages: string[];
  css: string;
  width: number;
  scrollToTop: ({ alignment }?: any) => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  startPage: number;
};

const PageCarousel = ({
  pages,
  css,
  width,
  scrollToTop,
  setCurrentPage,
  startPage,
}: Props) => {
  const { classes, cx } = useStyles();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: startPage,
    watchDrag: false,
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      scrollToTop({ alignment: "start" });
    }
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      scrollToTop({ alignment: "start" });
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
    onSelect(emblaApi);
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

  return (
    <>
      <div className="embla">
        <div
          className="embla__viewport"
          ref={emblaRef}
          style={{ width: width - px("2rem") }}
        >
          <div className="embla__container">
            {pages.map((page, index) => (
              <div className="embla__slide" key={index}>
                <style>{cssWithoutBodyMargins}</style>
                <div
                  className="embla__page"
                  dangerouslySetInnerHTML={{ __html: page }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={cx(classes["pageButtons"])}>
          <Group spacing="xs">
            <ActionIcon
              variant="transparent"
              onClick={() => scrollToTop({ alignment: "start" })}
            >
              <IconArrowBarToUp />
            </ActionIcon>
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
    </>
  );
};

export default PageCarousel;
