// app/components/ProductCarousel.tsx
"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay"; // optional
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

type Img = { src: string; alt?: string };

interface ProductCarouselProps {
  images: Img[];
  /** Height for the main viewer (px). Thumbnails auto-scale. */
  height?: number;
  /** Enable autoplay (ms delay). Set to 0/undefined to disable. */
  autoplayMs?: number;
  className?: string;
}

export default function ProductCarousel({
  images,
  height = 520,
  autoplayMs,
  className = "",
}: ProductCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [thumbApi, setThumbApi] = React.useState<CarouselApi | null>(null);
  const [selected, setSelected] = React.useState(0);

  // keep carousels in sync (main <-> thumbnails)
  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      const idx = api.selectedScrollSnap();
      setSelected(idx);
      thumbApi?.scrollTo(idx);
    };
    api.on("select", onSelect);
    onSelect();
    return () => {
      api.off("select", onSelect);
    };
  }, [api, thumbApi]);

  const maybeAutoplay = React.useMemo(
    () =>
      autoplayMs && autoplayMs > 0
        ? [
            Autoplay({
              delay: autoplayMs,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]
        : undefined,
    [autoplayMs]
  );

  return (
    <div className={["w-full", className].join(" ")}>
      {/* MAIN VIEWER */}
      <div className="rounded-[28px] border bg-white p-6 shadow-sm">
        <Carousel
          opts={{ loop: true, align: "start" }}
          setApi={setApi}
          plugins={maybeAutoplay}
          className="relative"
        >
          <div
            className="relative w-full overflow-hidden rounded-3xl bg-white"
            style={{ height }}
          >
            <CarouselContent className="h-full">
              {images.map((img, i) => (
                <CarouselItem
                  key={i}
                  className="flex h-full items-center justify-center"
                >
                  <img
                    src={img.src}
                    alt={img.alt ?? `image-${i}`}
                    className="object-contain"
                    sizes="(min-width: 1024px) 900px, 100vw"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* main arrows floating over the viewer */}
            <CarouselPrevious className="left-3 top-1/2 -translate-y-1/2" />
            <CarouselNext className="right-3 top-1/2 -translate-y-1/2" />
          </div>
        </Carousel>
      </div>

      {/* THUMB STRIP */}
      <div className="mt-6">
        <Carousel
          opts={{
            dragFree: true,
            containScroll: "trimSnaps",
            align: "start",
          }}
          setApi={setThumbApi}
          className="relative"
        >
          <CarouselContent className="-ml-3">
            {images.map((img, i) => (
              <CarouselItem
                key={`thumb-${i}`}
                className="basis-[120px] pl-3"
                onClick={() => api?.scrollTo(i)}
              >
                <button
                  className={[
                    "relative aspect-square w-full overflow-hidden rounded-2xl border transition",
                    selected === i
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-transparent hover:border-muted-foreground/20",
                  ].join(" ")}
                  aria-label={`Go to image ${i + 1}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt ?? `thumb-${i}`}
                    className="object-contain bg-white"
                    sizes="120px"
                  />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* arrows for the thumb strip */}
          <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 h-9 w-9" />
          <CarouselNext className="right-2 top-1/2 -translate-y-1/2 h-9 w-9" />
        </Carousel>
      </div>
    </div>
  );
}
