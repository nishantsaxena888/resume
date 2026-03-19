import React, { useState } from "react";
import QuantitySelector from "../quantity-selector/QuantitySelector";
import { Col, Row } from "react-bootstrap";
import Link from "next/link";
import { useCart, useTotalPrice } from "../../store/use-cart";

const SidebarCart = ({ isCartOpen, closeCart }: any) => {
  const subTotal = useTotalPrice(); // reactive
  const [vat] = useState(0);

  const total = subTotal + vat;

  const add = useCart((s) => s.add_to_cart);
  const dec = useCart((s) => s.remove_one);
  const remove = useCart((s) => s.remove_item);
  const cart = useCart((s) => s.cart_list);

  return (
    <>
      <div
        onClick={closeCart}
        style={{ display: isCartOpen ? "block" : "none" }}
        className="bb-side-cart-overlay"
      ></div>
      <div className={`bb-side-cart ${isCartOpen ? "bb-open-cart" : ""}`}>
        <Row className="row h-full">
          <Col md={12} className="col-12">
            <div className="bb-inner-cart">
              <div className="bb-top-contact">
                <div className="bb-cart-title">
                  <h4>My cart</h4>
                  <a
                    onClick={closeCart}
                    className="bb-cart-close"
                    title="Close Cart"
                  ></a>
                </div>
              </div>
              <div className="bb-cart-box item">
                {cart.length === 0 ? (
                  <div>Your cart is empty</div>
                ) : (
                  <ul className="bb-cart-items">
                    {cart.map((data: any, index: any) => (
                      <li key={index} className="cart-sidebar-list">
                        <a
                          onClick={() => remove(data.id)}
                          className="cart-remove-item"
                        >
                          <i className="ri-close-line"></i>
                        </a>
                        <a
                          onClick={(e) => e.preventDefault()}
                          href="#"
                          className="bb-cart-pro-img"
                        >
                          <img src={data.image} alt="product-img-1" />
                        </a>
                        <div className="bb-cart-contact">
                          <Link
                            href="/product-left-sidebar"
                            className="bb-cart-sub-title"
                          >
                            {data.name}
                          </Link>
                          <span className="cart-price">
                            <span className="new-price">
                              ${data.price * data.quantity}.00
                            </span>{" "}
                            x {data.weight}
                          </span>
                          <div className="qty-plus-minus">
                            <QuantitySelector
                              increment={() => add(data)}
                              decrement={() => dec(data.id)}
                              quantity={data.quantity}
                            />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="bb-bottom-cart">
                {cart.length ? (
                  <div className="cart-sub-total">
                    <table className="table cart-table">
                      <tbody>
                        <tr>
                          <td className="title">Sub-Total :</td>
                          <td className="price">${subTotal.toFixed(2)}</td>
                        </tr>
                        {/* <tr>
                          <td className="title">VAT (20%) :</td>
                          <td className="price">${vat.toFixed(2)}</td>
                        </tr> */}
                        <tr>
                          <td className="title">Total :</td>
                          <td className="price">${total.toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <></>
                )}
                <div className="cart-btn">
                  <Link href="/cart" className="bb-btn-1" onClick={closeCart}>
                    View Cart
                  </Link>
                  <Link
                    href="/checkout"
                    className="bb-btn-2"
                    onClick={closeCart}
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SidebarCart;
