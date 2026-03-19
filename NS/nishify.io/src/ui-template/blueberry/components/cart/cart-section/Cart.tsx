"use client";
import QuantitySelector from "@/ui-template/blueberry/components/quantity-selector/QuantitySelector";
import { useCart, useTotalPrice } from "@/ui-template/blueberry/store/use-cart";
import Link from "next/link";
import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Col, Row } from "react-bootstrap";

const Cart = ({ buttons }: any) => {
  const [vat] = useState(0);
  const [discount] = useState(0);

  const cart = useCart((s) => s.cart_list);
  const add = useCart((s) => s.add_to_cart);
  const dec = useCart((s) => s.remove_one);
  const remove = useCart((s) => s.remove_item);

  const subTotal = useTotalPrice();

  const discountAmount = subTotal * (discount / 100);
  const total = subTotal + vat - discountAmount;

  return (
    <>
      <section className="section-cart padding-tb-10">
        <div className="container">
          <Row className="mb-minus-24">
            <Col lg={8} className="mb-24">
              <Fade
                triggerOnce
                direction="up"
                duration={1000}
                delay={400}
                className="bb-cart-table"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="400"
              >
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>quality</th>
                      <th>Total</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.length === 0 ? (
                      <tr style={{ textAlign: "center" }}>
                        <td colSpan={6}>Your cart items is empty</td>
                      </tr>
                    ) : (
                      <>
                        {cart.map((data: any, index: any) => (
                          <tr key={index}>
                            <td>
                              <a onClick={(e) => e.preventDefault()} href="#">
                                <div className="Product-cart">
                                  <img src={data.image} alt="new-product-5" />
                                  <span>{data.name}</span>
                                </div>
                              </a>
                            </td>
                            <td>
                              <span className="price">${data.price}</span>
                            </td>
                            <td>
                              <div className="qty-plus-minus">
                                <QuantitySelector
                                  increment={() => add(data)}
                                  decrement={() => dec(data.id)}
                                  quantity={data.quantity}
                                />
                              </div>
                            </td>
                            <td>
                              <span className="price">
                                ${data.price * data.quantity}
                              </span>
                            </td>
                            <td>
                              <div className="pro-remove">
                                <a onClick={() => remove(data.id)}>
                                  <i className="ri-delete-bin-line"></i>
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </Fade>
            </Col>
            <Col lg={4} className="mb-24">
              <Fade
                triggerOnce
                direction="up"
                duration={1000}
                delay={200}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="200"
              >
                <div className="bb-cart-sidebar-block">
                  <div className="bb-sb-title">
                    <h3>Summary</h3>
                  </div>
                  <div className="bb-sb-blok-contact">
                    <div className="bb-cart-summary">
                      <div className="inner-summary">
                        <ul>
                          <li>
                            <span className="text-left">Sub-Total</span>
                            <span className="text-right">
                              ${subTotal.toFixed(2)}
                            </span>
                          </li>
                          <li>
                            <span className="text-left">Delivery Charges</span>
                            <span className="text-right">
                              ${vat.toFixed(2)}
                            </span>
                          </li>
                          {/* <li>
                            <span className="text-left">Coupon Discount</span>
                            <span className="text-right">
                              <a className="bb-coupon drop-coupon">
                                Apply Coupon
                              </a>
                            </span>
                          </li>
                          <DiscountCoupon
                            onDiscountApplied={handleDiscountApplied}
                          /> */}
                        </ul>
                      </div>
                      <div className="summary-total">
                        <ul>
                          <li>
                            <span className="text-left">Total Amount</span>
                            <span className="text-right">
                              ${total.toFixed(2)}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
              <div className="flex gap-3">
                {buttons.map((button: any, index: number) => (
                  <Fade
                    key={index}
                    triggerOnce
                    direction="up"
                    duration={1000}
                    delay={400}
                  >
                    <Link href={button.href} className="bb-btn-2 check-btn">
                      {button.label}
                    </Link>
                  </Fade>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default Cart;
