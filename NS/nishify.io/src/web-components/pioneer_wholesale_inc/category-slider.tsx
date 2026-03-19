"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { useCarouselControl } from "./use-carousel-control";

export default function CategorySlider({
  tagline,
  title,
  image_url,
  items,
  id,
}: {
  id: string;
  tagline: string;
  title: string;
  image_url: string;
  items: Array<{
    title: string;
    description: string;
    link: string;
    icon_url: string;
  }>;
}) {
  const { autoplay, setApi } = useCarouselControl({});

  return (
    <section
      id={id}
      className="section-category overflow-hidden py-[50px] max-[1199px]:py-[35px]"
    >
      <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
        <div className="flex flex-wrap w-full mb-[-24px]">
          <div className="min-[992px]:w-[41.66%] w-full px-[12px] mb-[24px]">
            <div className="bb-category-img relative max-[991px]:hidden">
              <Image
                width={526}
                height={526}
                src={image_url}
                alt="category"
                className="w-full rounded-[30px]"
              />
              <div className="bb-offers py-[5px] px-[15px] absolute top-[20px] right-[20px] bg-[#000] opacity-[0.8] rounded-[15px]">
                <span className="text-[14px] font-normal text-[#fff]">
                  {tagline}
                </span>
              </div>
            </div>
          </div>

          <div className="min-[992px]:w-[58.33%] w-full px-[12px] mb-[24px]">
            <div className="bb-category-contact max-[991px]:mt-[-24px]">
              <div
                className="category-title mb-[30px] max-[991px]:hidden"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={600}
              >
                <h2 className="font-quicksand text-[124px] text-[#fff] opacity-[0.15] font-bold leading-[1.2] tracking-[0.03rem] max-[1399px]:text-[95px] max-[1199px]:text-[70px] max-[767px]:text-[42px]">
                  {title}
                </h2>
              </div>

              <div className="bg-white rounded-tl-[30px] pt-[30px]">
                <Carousel
                  className="w-full"
                  plugins={[autoplay.current]}
                  setApi={setApi}
                  opts={{
                    loop: true,
                    align: "start",
                    containScroll: "trimSnaps",
                    slidesToScroll: 1,
                  }}
                >
                  <CarouselContent className="-ml-4">
                    {[...items, ...items].map((item, index) => (
                      <CarouselItem key={index} className="pl-4 md:basis-1/4">
                        <div
                          className="bb-category-box p-[30px] rounded-[20px] flex flex-col items-center text-center max-[1399px]:p-[20px] bg-[#fef1f1]"
                          data-aos="flip-left"
                          data-aos-duration={1000}
                          data-aos-delay={200}
                        >
                          <div className="category-image mb-[12px]">
                            <Image
                              width={50}
                              height={50}
                              src={item.icon_url}
                              alt={item.title}
                              className="w-[50px] h-[50px] max-[1399px]:h-[65px] max-[1399px]:w-[65px] max-[1199px]:h-[50px] max-[1199px]:w-[50px]"
                            />
                          </div>
                          <div className="category-sub-contact">
                            <h5 className="mb-[2px] text-[16px] font-quicksand text-[#3d4750] font-semibold tracking-[0.03rem] leading-[1.2]">
                              <Link
                                href={item.link}
                                className="font-Poppins text-[16px] font-medium leading-[1.2] tracking-[0.03rem] text-[#3d4750] capitalize"
                              >
                                {item.title}
                              </Link>
                            </h5>
                            <p className="font-Poppins text-[13px] text-[#686e7d] leading-[25px] font-light tracking-[0.03rem]">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
