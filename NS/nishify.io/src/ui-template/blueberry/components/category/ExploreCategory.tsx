"use client";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Link from "next/link";
import AOS from "aos";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// type CategoryItem = {
//   id: string | number;
//   name: string;
//   image: string;
//   itemCount: number;
//   href: string;
//   num?: number; // keeps your category-items-{num} class hook
// };

const ExploreCategory = ({ banner, title, swiper, categories }: any) => {
  const settings = {
    spaceBetween: swiper.spaceBetween,
    loop: swiper.loop,
    autoplay: {
      delay: swiper.autoplayDelay,
      disableOnInteraction: false,
    },
    breakpoints: swiper.breakpoints,
    modules: [Autoplay],
  };

  useEffect(() => {
    AOS.init();
  }, []);

  const data = categories;

  return (
    <>
      <section className="section-category padding-tb-50">
        <div className="container">
          <Row className="mb-minus-24">
            <Col lg={5} className="col-12 mb-24">
              <div className="bb-category-img">
                <img src={banner.image} alt={banner.alt} />
                <div className="bb-offers">
                  <span>{banner.offerText}</span>
                </div>
              </div>
            </Col>
            <Col lg={7} className="col-12 mb-24">
              <div className="bb-category-contact">
                <div
                  className="category-title"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay="600"
                >
                  <h2>{title}</h2>
                </div>
                <Swiper {...settings} className="bb-category-block ">
                  {data && data.length > 0 ? (
                    data.map((cat: any) => (
                      <SwiperSlide key={cat.id}>
                        <div
                          className={`bb-category-box category-items-${
                            cat.num ?? cat.id
                          }`}
                          data-aos="flip-left"
                          data-aos-duration="1000"
                          data-aos-delay="200"
                        >
                          <div className="category-image">
                            <img src={cat.image} alt="category" />
                          </div>
                          <div className="category-sub-contact">
                            <h5>
                              <Link href={cat.href}>{cat.name}</Link>
                            </h5>
                            <p>{cat.itemCount} items</p>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))
                  ) : (
                    <></>
                  )}
                </Swiper>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default ExploreCategory;
