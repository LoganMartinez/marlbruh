import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import "../../../css/embla.css";
import {
  ActionIcon,
  Center,
  Group,
  Progress,
  Space,
  createStyles,
} from "@mantine/core";
import {
  IconArrowBarToUp,
  IconArrowLeft,
  IconArrowRight,
  IconBookmark,
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
  width: number | string;
  scrollToTop: ({ alignment }?: any) => void;
};

const PageCarousel = ({ pages, css, width, scrollToTop }: Props) => {
  const { classes, cx } = useStyles();
  const [emblaRef, emblaApi] = useEmblaCarousel({});
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

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
    setScrollProgress(
      (emblaApi.selectedScrollSnap() / (pages.length - 1)) * 100
    );
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

  return (
    <>
      <div className="embla">
        <Center>
          <Progress w="50%" value={scrollProgress} />
        </Center>
        <Group position="apart">
          <Space />
          <ActionIcon pb="1rem">
            <IconBookmark />
          </ActionIcon>
        </Group>

        <div
          className="embla__viewport"
          ref={emblaRef}
          style={{ width: width }}
        >
          <div className="embla__container">
            {pages.map((page, index) => (
              <div className="embla__slide" key={index}>
                <style>{css}</style>
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
