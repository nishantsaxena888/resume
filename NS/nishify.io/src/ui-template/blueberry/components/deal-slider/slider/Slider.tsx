// import fetcher from '@/components/fetcher/Fetcher'
import ProductItemCard from "@/ui-template/blueberry/components/item/ProductItemCard";
import React from "react";
import { Fade } from "react-awesome-reveal";
// import { Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
// import useSWR from "swr";
// import DealSlider from "../DealSlider";

const Slider = (
  {
    // onSuccess = () => {},
    // hasPaginate = false,
    // onError = () => {},
  }
) => {
  // const { data, error } = useSWR("/api/deal-slider", fetcher, { onSuccess, onError });

  // if (error) return <div>Failed to load products</div>;
  // if (!data)
  //     return (
  //         <div>
  //             {/* <Spinner /> */}
  //         </div>
  //     );

  // const getData = () => {
  //     if (hasPaginate) return data.data;
  //     else return data;
  // };
  const data: any = [
    {
      title: "Mixed Fruits Chocolates",
      sale: "New",
      image: "/assets/blueberry/img/product/1.jpg",
      imageTwo: "/assets/blueberry/img/product/back-1.jpg",
      category: "Chocos",
      oldPrice: "$30.00",
      newPrice: 20,
      location: "In Store",
      brand: "Bhisma Organics",
      sku: 24433,
      itemLeft: "",
      id: 25,
      quantity: 1,
      rating: 4,
      status: "In Stock",
      weight: "1 Pack",
    },
    {
      title: "Organic Apple Juice Pack",
      sale: "Hot",
      image: "/assets/blueberry/img/product/2.jpg",
      imageTwo: "/assets/blueberry/img/product/back-2.jpg",
      category: "Juice",
      // oldPrice: 2,
      newPrice: 15,
      location: "online",
      brand: "Peoples Store",
      sku: 24433,
      itemLeft: "3 Left",
      id: 26,
      quantity: 1,
      rating: 4,
      status: "Out Of Stock",
      weight: "100 ml",
    },
    {
      title: "Mixed Almond nuts juice Pack",
      sale: "",
      image: "/assets/blueberry/img/product/3.jpg",
      imageTwo: "/assets/blueberry/img/product/back-3.jpg",
      category: "Juice",
      oldPrice: "$32.00",
      newPrice: 39,
      location: "In Store,online",
      brand: "Darsh Mart",
      sku: 24433,
      itemLeft: "",
      id: 27,
      quantity: 1,
      rating: 4,
      status: "In Stock",
      weight: "250 g",
    },
    {
      title: "Fresh Mango Slice Juice",
      sale: "Sale",
      image: "/assets/blueberry/img/product/4.jpg",
      imageTwo: "/assets/blueberry/img/product/back-4.jpg",
      category: "Fruits",
      // oldPrice: 2,
      newPrice: 25,
      location: "In Store",
      brand: "Bhisma Organics",
      sku: 24433,
      itemLeft: "Out Of Stock",
      id: 26,
      quantity: 1,
      rating: 4,
      status: "",
      weight: "100 ml",
    },
    {
      title: "Black Pepper Spice pack",
      sale: "",
      image: "/assets/blueberry/img/new-product/5.jpg",
      imageTwo: "/assets/blueberry/img/new-product/back-5.jpg",
      category: "Spices",
      oldPrice: "$32.00",
      newPrice: 22,
      location: "online",
      brand: "Peoples Store",
      sku: 24433,
      itemLeft: "",
      id: 5,
      quantity: 1,
      rating: 4,
      status: "In Stock",
      weight: "1 pack",
    },
  ];
  return (
    <div className="col-12">
      <Swiper
        loop={true}
        autoplay={{ delay: 1000 }}
        slidesPerView={4}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 1,
          },
          481: {
            slidesPerView: 2,
          },
          767: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1199: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
        className="bb-deal-slider"
      >
        <div className="bb-deal-block owl-carousel">
          <Fade triggerOnce duration={1000} delay={200} direction="up">
            {data.map((data: any, index: any) => (
              <SwiperSlide className="bb-deal-card" key={index}>
                <ProductItemCard data={data} />
              </SwiperSlide>
            ))}
          </Fade>
        </div>
      </Swiper>
    </div>
  );
};

export default Slider;
