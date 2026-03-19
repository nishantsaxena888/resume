import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { useEffect, useRef, useState } from "react";
import { CarouselApi } from "@/components/ui/carousel";

export const useCarouselControl = ({
  delay = 5000,
  stopOnInteraction = true,
}: {
  delay?: number;
  stopOnInteraction?: boolean;
}) => {
  const [api, setApi] = useState<CarouselApi>();

  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const autoplay = useRef(
    Autoplay({ delay: delay, stopOnInteraction: stopOnInteraction })
  );
  const fade = useRef(Fade());

  const isNextDisabled = current === count - 1;
  const isPrevDisabled = current === 0;

  const nextSlide = () => api?.scrollNext();
  const prevSlide = () => api?.scrollPrev();

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return {
    current,
    count,
    autoplay,
    fade,
    api,
    setApi,
    nextSlide,
    prevSlide,
    isNextDisabled,
    isPrevDisabled,
  };
};
