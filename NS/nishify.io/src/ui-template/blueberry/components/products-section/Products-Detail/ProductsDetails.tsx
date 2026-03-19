/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { Fragment, useMemo, useState } from "react";
import SingleProductSlider from "./single-product-slider/SingleProductSlider";
import { Col, Row } from "react-bootstrap";
import Link from "next/link";
import ZoomProductImage from "../zoom-product-img/ZoomProductImage";

type WeightOption = { value: string };

const ProductsDetails = (prop: any) => {
  // ===== DYNAMIC JSON CONFIG (inside component) =====

  const getImages = (prop: string | any) => {
    if (!prop) return null;
    try {
      return JSON.parse(prop);
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const getGallery = (prop: string | any) => {
    if (!prop) return [];
    try {
      return JSON.parse(prop);
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const other_info = (prop: string) => {
    try {
      return JSON.parse(prop);
    } catch (error) {
      return [];
    }
  };

  const PRODUCT_CONFIG = {
    title: prop.name,
    description: prop.description,
    short_description: prop.short_description,
    other_information: other_info(prop.other_information),
    thumbnail: getImages(prop.image),
    gallery: getGallery(prop.gallery),
    rating: {
      // 0–5 (can be decimal like 4.3). Stars render to the nearest half step visually with fill/line icons.
      value: 4, // your UI uses only fill or line icons; using 4 here matches your original
      totalRatingsText: "992 Ratings",
      ratingsAnchor: "#bb-spt-nav-review",
    },
    pricing: {
      price: prop.default_price, // selling price
      mrp: prop.default_price + 3, // M.R.P. (struck)
    },
    sku: prop.item_code,
    stockText: "In stock",

    weights: [
      { value: "250g" },
      { value: "500g" },
      { value: "1kg" },
      { value: "2kg" },
    ] as WeightOption[],
    cart: {
      href: "/cart",
      text: "View Cart",
    },
    actions: {
      wishlist: { href: "#", preventDefault: true },
      quickview: {
        href: "#",
        preventDefault: true,
        modalId: "bry_quickview_modal", // hooks into your existing modal
        title: "Quick view",
        dataLinkAction: "quickview",
      },
    },
  };

  // ===== State =====
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);

  // ===== Derived values =====
  const discountPercent = useMemo(() => {
    const { price, mrp } = PRODUCT_CONFIG.pricing;
    if (!mrp || mrp <= 0 || price >= mrp) return 0;
    return Math.round(((mrp - price) / mrp) * 100);
  }, [PRODUCT_CONFIG.pricing]);

  const renderStars = (value: number) => {
    // Your UI uses fill or line icons only; render N fills then (5-N) lines
    const full = Math.max(0, Math.min(5, Math.round(value)));
    const empty = 5 - full;
    return (
      <>
        {Array.from({ length: full }).map((_, i) => (
          <i key={`f-${i}`} className="ri-star-fill"></i>
        ))}
        {Array.from({ length: empty }).map((_, i) => (
          <i key={`e-${i}`} className="ri-star-line"></i>
        ))}
      </>
    );
  };

  // ===== Handlers =====
  const handleActiveTab = (index: number) => setActiveIndex(index);
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  function getValueByPath(
    obj: any,
    path: string,
    defaultValue: any = undefined
  ): any {
    if (!obj || !path) return defaultValue;

    // Convert array-style paths: items[0].name → items.0.name
    const parts = path
      .replace(/\[(\d+)\]/g, ".$1")
      .split(".")
      .filter(Boolean);

    return parts.reduce((acc, key) => {
      if (acc && typeof acc === "object" && key in acc) {
        return acc[key];
      }
      return defaultValue;
    }, obj);
  }

  return (
    <>
      <div className="bb-single-pro">
        <Row>
          <Col sm={12} lg={5} className="col-12 mb-24">
            {PRODUCT_CONFIG?.gallery?.length === 0 ? (
              <ZoomProductImage
                className="img-responsive"
                src={PRODUCT_CONFIG?.thumbnail?.url}
                alt="product-1"
              />
            ) : (
              <SingleProductSlider
                list={PRODUCT_CONFIG?.gallery}
                thumbnail={PRODUCT_CONFIG?.thumbnail}
              />
            )}
            {/* <ZoomProductImage
              className="img-responsive"
              src={PRODUCT_CONFIG?.image}
              alt="product-1"
            /> */}
            {/* Keep your existing slider UI. 
                If SingleProductSlider accepts props, pass PRODUCT_CONFIG.images, etc. */}
          </Col>
          <Col lg={7} className="col-12 mb-24">
            <div className="bb-single-pro-contact">
              <div className="sku">
                <div>SKU#: {PRODUCT_CONFIG.sku}</div>
              </div>

              <div className="bb-sub-title">
                <h4>{PRODUCT_CONFIG.title}</h4>
              </div>

              {/* <div className="bb-single-rating">
                <span className="bb-pro-rating">
                  {renderStars(PRODUCT_CONFIG.rating.value)}
                </span>
                <span className="bb-read-review">
                  |&nbsp;&nbsp;
                  <Link href={PRODUCT_CONFIG.rating.ratingsAnchor}>
                    {PRODUCT_CONFIG.rating.totalRatingsText}
                  </Link>
                </span>
              </div> */}

              <div
                dangerouslySetInnerHTML={{
                  __html: PRODUCT_CONFIG.short_description,
                }}
              />

              <div className="bb-single-price-wrap">
                <div className="bb-single-price">
                  <div className="price">
                    <h5>
                      ${PRODUCT_CONFIG?.pricing?.price?.toFixed(2)}{" "}
                      {/* {discountPercent > 0 && <span>-{discountPercent}%</span>} */}
                    </h5>
                  </div>
                  <div className="mrp">
                    <p>
                      M.R.P. :{" "}
                      <span>${PRODUCT_CONFIG.pricing.mrp.toFixed(2)}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bb-single-list">
                <ul>
                  {PRODUCT_CONFIG.other_information.map((s: any, i: number) => {
                    if (!s?.featured) {
                      return null;
                    }
                    return (
                      <li key={i}>
                        <span>{s.label} :</span> {s.value}
                      </li>
                    );
                  })}

                  {prop?.top_information.map(
                    (s: { label: string; key: string }, i: number) => {
                      const displayValue = getValueByPath(prop, s.key);
                      if (!displayValue) {
                        return null;
                      }
                      return (
                        <li key={i}>
                          <span>{s.label} :</span> {displayValue}
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
              <div className="bb-single-price">
                <div className="stock">
                  <span>{PRODUCT_CONFIG.stockText}</span>
                </div>
              </div>
              {/* <div className="bb-single-pro-weight">
                <div className="pro-title">
                  <h4>Weight</h4>
                </div>
                <div className="bb-pro-variation-contant">
                  <ul>
                    {PRODUCT_CONFIG.weights.map((opt, index) => (
                      <li
                        key={opt.value}
                        onClick={() => handleActiveTab(index)}
                        className={
                          activeIndex === index ? "active-variation" : ""
                        }
                      >
                        <span>{opt.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div> */}

              <div className="bb-single-qty">
                <div className="qty-plus-minus">
                  <div
                    onClick={prop.decCart}
                    className="bb-qtybtn"
                    style={{ margin: " 0 0 0 10px" }}
                  >
                    -
                  </div>
                  <input
                    readOnly
                    className="qty-input location-select"
                    type="text"
                    name="gi-qtybtn"
                    value={quantity}
                  />
                  <div
                    onClick={prop.handleCart}
                    className="bb-qtybtn"
                    style={{ margin: " 0 10px 0 0" }}
                  >
                    +
                  </div>
                </div>

                <div className="buttons">
                  <Link href={PRODUCT_CONFIG.cart.href} className="bb-btn-2">
                    {PRODUCT_CONFIG.cart.text}
                  </Link>
                </div>

                <ul className="bb-pro-actions ">
                  <li className="bb-btn-group hidden">
                    <a
                      onClick={(e) => {
                        if (PRODUCT_CONFIG.actions.wishlist.preventDefault)
                          e.preventDefault();
                      }}
                      href={PRODUCT_CONFIG.actions.wishlist.href}
                    >
                      <i className="ri-heart-line"></i>
                    </a>
                  </li>

                  <li className="bb-btn-group hidden">
                    <a
                      onClick={(e) => {
                        if (PRODUCT_CONFIG.actions.quickview.preventDefault)
                          e.preventDefault();
                      }}
                      href={PRODUCT_CONFIG.actions.quickview.href}
                      data-link-action={
                        PRODUCT_CONFIG.actions.quickview.dataLinkAction
                      }
                      title={PRODUCT_CONFIG.actions.quickview.title}
                      data-bs-toggle="modal"
                      data-bs-target={`#${PRODUCT_CONFIG.actions.quickview.modalId}`}
                    >
                      <i className="ri-eye-line"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProductsDetails;
