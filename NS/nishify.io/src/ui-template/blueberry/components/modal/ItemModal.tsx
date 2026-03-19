/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { /* useEffect, */ useMemo, useState } from "react";
import { Fade } from "react-awesome-reveal";
import Modal from "react-bootstrap/Modal";
import StarRating from "../stars/StarRating";
import QuantitySelector from "../quantity-selector/QuantitySelector";
// import { useDispatch, useSelector } from 'react-redux'
// import { RootState } from '@/store'
// import { addItem, updateItemQuantity } from '@/store/reducer/cartSlice'
// import { showSuccessToast } from "../toast-popup/Toastify";
import ZoomProductImage from "../products-section/zoom-product-img/ZoomProductImage";
import { Col, Row } from "react-bootstrap";
import Link from "next/link";
import { getImages } from "@/lib/utils";
import { showSuccessToast } from "../toast-popup/Toastify";
import { useCart } from "../../store/use-cart";

interface Item {
  id: number;
  title: string;
  newPrice: number;
  weight: string;
  image: string;
  imageTwo: string;
  date: string;
  status: string;
  rating: number;
  oldPrice: number;
  location: string;
  brand: string;
  sku: number;
  category: string;
  quantity: number;
}

interface Option {
  value: string;
  tooltip: string;
}

const ItemModal = ({ closeItemModal, isModalOpen, data }: any) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const options: Option[] = [
    { value: "250g", tooltip: "Small" },
    { value: "500g", tooltip: "Medium" },
    { value: "1kg", tooltip: "Large" },
    { value: "2kg", tooltip: "Extra Large" },
  ];

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  const add = useCart((s) => s.add_to_cart);
  const dec = useCart((s) => s.remove_one);

  const cart = useCart((s) => s.cart_list);

  const qty = useMemo(() => {
    const currentData = cart.find((item) => item.id == data.id);
    return currentData?.quantity;
  }, [cart, data.id]);

  const handleCart = () => {
    add({
      id: "" + data.id,
      name: data.title,
      image: getImages(data.image)?.url,
      quantity: 1, // quantity in cart
      price: data.newPrice,
      weight: 1,
    });
    showSuccessToast(data.title + "  added to cart");

    // showErrorToast("Item already have to compare list");
  };

  return (
    <Fade triggerOnce duration={500} delay={100}>
      <Modal
        show={isModalOpen}
        centered
        onHide={closeItemModal}
        keyboard={false}
        className={`modal fade quickview-modal`}
        id="bry_quickview_modal"
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal-content">
          <pre>{JSON.stringify(qty)}</pre>
          <button
            onClick={closeItemModal}
            type="button"
            className="qty-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            title="Close"
          ></button>
          <Modal.Body>
            <Row className="mb-minus-24">
              <Col xs={12} sm={12} md={5} className="mb-24">
                <div className="single-pro-img single-pro-img-no-sidebar">
                  <div className="single-product-scroll">
                    <div className="single-slide zoom-image-hover">
                      {getImages(data.image)?.url ? (
                        <ZoomProductImage
                          className="img-responsive"
                          src={getImages(data.image)?.url}
                          alt="product-img-1"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={12} md={7} className="mb-24">
                <div className="quickview-pro-content">
                  <h5 className="bb-quick-title">
                    <Link href="/product-left-sidebar">{data?.title}</Link>
                  </h5>
                  <StarRating rating={data?.rating} />
                  <div className="bb-quickview-desc">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data.short_description,
                      }}
                    />
                  </div>
                  <div className="bb-quickview-price">
                    <span className="new-price">
                      ${data?.newPrice * (qty || 1)}
                    </span>
                    <span className="old-price">${data?.oldPrice}</span>
                  </div>
                  <div className="bb-pro-variation">
                    <ul>
                      {options.map((data, index) => (
                        <li
                          key={index}
                          onClick={() => handleClick(index)}
                          className={activeIndex === index ? "active" : ""}
                        >
                          <a className="bb-opt-sz" data-tooltip={data.tooltip}>
                            {data.value}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bb-quickview-qty">
                    {qty ? (
                      <div className="qty-plus-minus">
                        <QuantitySelector
                          // setQuantity={setQuantity}
                          increment={handleCart}
                          quantity={qty || 1}
                          decrement={() => dec("" + data.id)}
                          // id={data.id}
                        />
                      </div>
                    ) : (
                      <div className="bb-quickview-cart">
                        <button
                          onClick={() => handleCart()}
                          type="button"
                          className="bb-btn-1"
                        >
                          <i className="ri-shopping-bag-line"></i>Add To Cart
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </Modal.Body>
        </div>
      </Modal>
    </Fade>
  );
};

export default ItemModal;
