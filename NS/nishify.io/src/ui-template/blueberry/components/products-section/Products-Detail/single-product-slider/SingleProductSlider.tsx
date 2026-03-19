"use client";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import useSWR from 'swr';
// import fetcher from "@/ui-template/blueberry/components/fetcher/Fetcher";
import ZoomProductImage from "../../zoom-product-img/ZoomProductImage";

const SingleProductSlider = ({ list, thumbnail }: any) => {
  const [isSliderInitialized, setIsSliderInitialized] = useState(false);
  const initialRef: Slider | null = null;
  const slider1 = useRef<Slider | null>(initialRef);
  const slider2 = useRef<Slider | null>(initialRef);

  const slider1Settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    asNavFor: slider2.current,
    focusOnSelect: true,
  };

  const slider2Settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: slider1.current,
    dots: false,
    arrows: true,
    focusOnSelect: true,
  };

  useEffect(() => {
    setIsSliderInitialized(true);
  }, [isSliderInitialized]);

  const handleSlider1Click = (index: any) => {
    if (slider2.current) {
      slider2.current.slickGoTo(index);
    }
  };

  const handleSlider2Click = (index: any) => {
    if (slider1.current) {
      slider1.current.slickGoTo(index);
    }
  };

  // const data = [
  //   {
  //     image: "/assets/blueberry/img/new-product/1.jpg",
  //   },
  //   {
  //     image: "/assets/blueberry/img/new-product/2.jpg",
  //   },
  //   {
  //     image: "/assets/blueberry/img/new-product/3.jpg",
  //   },
  //   {
  //     image: "/assets/blueberry/img/new-product/4.jpg",
  //   },
  //   {
  //     image: "/assets/blueberry/img/new-product/5.jpg",
  //   },
  // ];
  const data = [...[thumbnail], ...list];
  return (
    <>
      <div className="single-pro-slider">
        <Slider
          {...slider1Settings}
          ref={(slider) => {
            slider1.current = slider;
          }}
          asNavFor={slider2.current || undefined}
          className="single-product-cover"
        >
          {data.map((image: any, index: any) => (
            <div
              key={index}
              onClick={() => handleSlider1Click(index)}
              className="single-slide zoom-image-hover flex items-center justify-center"
            >
              <ZoomProductImage
                className="img-responsive"
                src={image.url}
                alt="product-1"
              />
            </div>
          ))}
        </Slider>
        <Slider
          {...slider2Settings}
          ref={(slider) => {
            slider2.current = slider;
          }}
          asNavFor={slider1.current || undefined}
          className="single-nav-thumb"
        >
          {data.map((image: any, index: any) => (
            <div
              key={index}
              onClick={() => handleSlider2Click(index)}
              className="single-slide"
            >
              <img
                className="img-responsive w-[106px] h-[106px] object-cover"
                src={image.url}
                alt="product-1"
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default SingleProductSlider;
