"use client";
import React from "react";
import ProductsDetails from "./Products-Detail/ProductsDetails";
import ProductsTabs from "./Products-Tabs/ProductsTabs";
import { Col, Row } from "react-bootstrap";
import { useEntityList } from "@/hooks";
import { useCart } from "../../store/use-cart";
import { showSuccessToast } from "../toast-popup/Toastify";
import { getImages } from "@/lib/utils";

const Products = ({ top_information }: any) => {
  const ctl = useEntityList("item", { mode: "server", id: 1 });

  const product_details = ctl?.items?.[0];

  const add = useCart((s) => s.add_to_cart);
  const dec = useCart((s) => s.remove_one);

  const handleCart = () => {
    add({
      id: "" + product_details.id,
      name: product_details.name,
      image: getImages(product_details.image).url,
      quantity: 1,
      price: product_details.default_price,
      weight: 1,
    });
    showSuccessToast(product_details.name + "  added to cart");
  };
  const decCart = () => {
    console.log(product_details.id);
    dec("" + product_details.id);
  };

  return (
    <div>
      <section className="section-product padding-tb-50">
        <div className="container">
          <Row className="row mb-minus-24">
            <Col lg={12} sm={12} className="mb-24">
              <ProductsDetails
                {...product_details}
                top_information={top_information}
                handleCart={handleCart}
                decCart={decCart}
              />
              <ProductsTabs
                {...product_details}
                top_information={top_information}
              />
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
};

export default Products;
