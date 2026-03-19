/* eslint-disable react-hooks/exhaustive-deps */
// useAosInCarousel.ts
"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import type { CarouselApi } from "@/components/ui/carousel";

type Options = Parameters<typeof AOS.init>[0];

export function useAosInCarousel(
  api?: CarouselApi,
  opts: Options = {},
  container?: React.RefObject<HTMLElement> // 👈 NEW
) {
  useEffect(() => {
    AOS.init({ once: false, duration: 600, ...opts });
  }, []); // init once

  useEffect(() => {
    if (!api) return;

    const retrigger = () => {
      const idx = api.selectedScrollSnap();

      // prefer a container (wrapper around your Carousel)
      const root = container?.current ?? document;

      // be robust to class/attr names used by Embla/shadcn
      const slides =
        root.querySelectorAll<HTMLElement>(
          ".embla__slide, [data-embla-slide], [data-carousel-item]"
        ) || [];

      const slideEl = slides[idx];
      if (!slideEl) {
        // fallback: refresh all inside root (last resort)
        AOS.refreshHard();
        return;
      }

      const nodes = Array.from(
        slideEl.querySelectorAll<HTMLElement>("[data-aos]")
      );

      nodes.forEach((n) => n.classList.remove("aos-animate"));

      requestAnimationFrame(() => {
        AOS.refreshHard();
        nodes.forEach((n) => n.classList.add("aos-animate"));
      });
    };

    retrigger(); // initial
    api.on?.("select", retrigger);
    api.on?.("reInit", retrigger);

    return () => {
      api.off?.("select", retrigger);
      api.off?.("reInit", retrigger);
    };
  }, [api, container]);
}
