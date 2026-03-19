"use client";
import React, { useCallback, useRef } from "react";

// Swiper core styles
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { cn } from "@/lib/utils";
import { useCarouselControl } from "./use-carousel-control";
import { useAosInCarousel } from "./use-aos-in-carousel";
import { BannerSlide } from "./dynamic-components/new/banner-slide";

export default function Hero({ slides }: any) {
  const wrapRef = useRef<HTMLDivElement>(null); // 👈 NEW

  const handleScrollClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    // Smooth scroll ~1000px down (tweak if you want to target a specific element)
    window.scrollTo({ top: 1000, behavior: "smooth" });
  }, []);

  const { api, autoplay, fade, count, current, setApi } = useCarouselControl({
    delay: 5000,
    stopOnInteraction: true,
  });

  useAosInCarousel(api, { duration: 700 }, wrapRef as any);

  return (
    <>
      <section className="section-hero mb-[50px] max-[1199px]:mb-[35px] py-[50px] relative bg-[#f8f8fb] overflow-hidden">
        {/* Left rotated social links (unchanged) */}
        {/* <div className="bb-social-follow absolute left-[20px] bottom-[30px] max-[1250px]:hidden">
          <ul className="inner-links">
            {[
              { label: "Fb" },
              { label: "Li" },
              { label: "Dr" },
              { label: "In" },
            ].map((s) => (
              <li key={s.label} className="p-[6px] rotate-[270deg]">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[16px] font-medium text-[#777] hover:text-[#13151a] leading-[28px] tracking-[0.03rem] uppercase"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div> */}

        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full">
            <div className="w-full">
              {/* Swiper */}
              <div
                ref={wrapRef} // 👈 wrap around the Carousel
                className="hero-slider  swiper-container"
              >
                <Carousel
                  plugins={[autoplay.current, fade.current]}
                  className="w-full max-w-full"
                  setApi={setApi}
                >
                  <CarouselContent>
                    {slides?.map((config: any, index: number) => (
                      <CarouselItem key={index}>
                        <BannerSlide {...config} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="mt-4 flex items-center justify-center md:justify-start gap-2">
                    {Array.from({ length: count }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Go to slide ${i + 1}`}
                        onClick={() => api?.scrollTo(i)}
                        className={cn(
                          "h-[15px] w-[15px] skew-x-[340deg] transition-all",
                          "bg-muted-foreground/40 hover:bg-muted-foreground/70",
                          current === i && "w-10 bg-primary"
                        )}
                      />
                    ))}
                  </div>
                </Carousel>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Page trigger (React replacement for jQuery) */}
        <div className="bb-scroll-Page absolute right-[-15px] bottom-[75px] rotate-[270deg] max-[575px]:hidden">
          <span className="scroll-bar transition-all duration-[0.3s] ease-in-out relative max-[1250px]:hidden">
            <button
              type="button"
              onClick={handleScrollClick}
              className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[16px] font-medium leading-[28px] tracking-[0.03rem] text-[#686e7d]"
            >
              Scroll Page
            </button>
          </span>
        </div>
      </section>
    </>
  );
}
