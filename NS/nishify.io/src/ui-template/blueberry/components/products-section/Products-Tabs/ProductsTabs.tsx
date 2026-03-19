/* eslint-disable @typescript-eslint/no-unused-vars */
import RatingComponent from "@/ui-template/blueberry/components/stars/RatingCompoents";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { Form } from "react-bootstrap";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const ProductsTabs = ({ other_information, description }: any) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [validated, setValidated] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [userData, _setUserData] = useState<any | null>(null);
  const [reviews, setReviews] = useState([
    {
      name: "Saddika Alard",
      rating: 3,
      comment:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
      avatar: "/assets/blueberry/img/user-photo/placeholder.jpg",
    },
  ]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      if (userData && comment && rating) {
        setReviews([
          ...reviews,
          {
            name: `${userData.firstName} ${userData.lastName}`,
            rating,
            comment,
            avatar:
              userData.profilePhoto || "/assets/img/user-photo/placeholder.jpg",
          },
        ]);
        setComment("");
        setRating(0);
      }
    }
    setValidated(true);
  };

  const handleProductClick = (index: number) => {
    setSelectedIndex(index);
  };

  const item_information = useMemo(() => {
    try {
      return JSON.parse(other_information);
    } catch (error) {
      return [];
    }
  }, [other_information]);

  return (
    <>
      <Tabs className="bb-single-pro-tab">
        <TabList className="bb-pro-tab">
          <ul className="bb-pro-tab-nav nav">
            <Tab
              style={{ outline: "none" }}
              className="nav-item"
              key={"detail"}
            >
              <a
                onClick={() => handleProductClick(0)}
                className={`nav-link  ${selectedIndex === 0 ? "active" : ""}`}
                data-bs-toggle="tab"
                href="#detail"
              >
                Detail
              </a>
            </Tab>
            <Tab
              style={{ outline: "none" }}
              className="nav-item"
              key={"information"}
            >
              <a
                onClick={() => handleProductClick(1)}
                className={`nav-link  ${selectedIndex === 1 ? "active" : ""}`}
                data-bs-toggle="tab"
                href="#information"
              >
                information
              </a>
            </Tab>
            {/* <Tab
              style={{ outline: "none" }}
              className="nav-item hidden"
              key={"reviews"}
            >
              <a
                onClick={() => handleProductClick(2)}
                className={`nav-link  ${selectedIndex === 2 ? "active" : ""}`}
                data-bs-toggle="tab"
                href="#reviews"
              >
                Reviews
              </a>
            </Tab> */}
          </ul>
        </TabList>
        <div className="tab-content">
          <TabPanel
            className={`tab-pane fade ${
              selectedIndex == 0 ? "show active" : ""
            }`}
            id="detail"
          >
            <div className="bb-inner-tabs">
              <div className="bb-details">
                {description && (
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                )}
                {/* <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Libero, voluptatum. Vitae dolores alias repellat eligendi,
                  officiis, exercitationem corporis quisquam delectus cum non
                  recusandae numquam dignissimos molestiae magnam hic natus.
                  Cumque.
                </p>
                <div className="details-info">
                  <ul>
                    <li>
                      Any Product types that You want - Simple, Configurable
                    </li>
                    <li>Downloadable/Digital Products, Virtual Products</li>
                    <li>Inventory Management with Backordered items</li>
                    <li>Flatlock seams throughout.</li>
                  </ul>
                  <ul>
                    <li>
                      <span>Highlights</span>Form FactorWhole
                    </li>
                    <li>
                      <span>Seller</span>No Returns Allowed
                    </li>
                    <li>
                      <span>Services</span>Cash on Delivery available
                    </li>
                  </ul>
                </div> */}
              </div>
            </div>
          </TabPanel>
          <TabPanel
            className={`tab-pane fade ${
              selectedIndex == 1 ? "show active" : ""
            }`}
            id="information"
          >
            <div className="bb-inner-tabs">
              <div className="information">
                <ul>
                  {item_information.map((item: any, index: number) => {
                    if (!item?.featured)
                      return (
                        <li key={index}>
                          <span>{item.label}</span> {item.value}
                        </li>
                      );
                  })}
                </ul>
              </div>
            </div>
          </TabPanel>
          {/* <TabPanel
            className={`tab-pane fade ${
              selectedIndex == 2 ? "show active" : ""
            }`}
            id="reviews"
          >
            {true ? (
              <>
                <div className="container">
                  <p>
                    Please{" "}
                    <Link style={{ color: "blue" }} href="/login">
                      login
                    </Link>{" "}
                    or{" "}
                    <Link style={{ color: "blue" }} href="/register">
                      register
                    </Link>{" "}
                    to review the blog comments.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="bb-inner-tabs">
                  <div className="bb-reviews">
                    {reviews.map((data, index) => (
                      <div key={index} className="reviews-bb-box">
                        <div className="inner-image">
                          <img
                            src={
                              data.avatar ||
                              "/assets/img/user-photo/placeholder.jpg"
                            }
                            alt="img-1"
                          />
                        </div>
                        <div className="inner-contact">
                          <h4>{data.name}</h4>
                          <div className="bb-pro-rating">
                            {[...Array(5)].map((_, i) => (
                              <i
                                key={i}
                                className={`ri-star-${
                                  i < data.rating ? "fill" : "line"
                                }`}
                              ></i>
                            ))}
                          </div>
                          <p>{data.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bb-reviews-form">
                    <h3>Add a Review</h3>
                    <Form
                      noValidate
                      validated={validated}
                      onSubmit={handleSubmit}
                      action="#"
                    >
                      <div className="bb-review-rating">
                        <RatingComponent value={rating} onChange={setRating} />
                      </div>
                      <div className="input-box">
                        <Form.Group>
                          <Form.Control
                            onChange={(e) => setComment(e.target.value)}
                            as="textarea"
                            value={comment}
                            rows={5}
                            name="comment"
                            placeholder="Enter Your Comment"
                            required
                          ></Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please Enter Comment.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                      <div className="input-button">
                        <button type="submit" className="bb-btn-2">
                          Submit
                        </button>
                      </div>
                    </Form>
                  </div>
                </div>
              </>
            )}
          </TabPanel> */}
        </div>
      </Tabs>
    </>
  );
};

export default ProductsTabs;
