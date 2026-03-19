import CategoryPopup from "@/ui-template/blueberry/components/category-popup/CategoryPopup";
import Link from "next/link";
import React, { useState } from "react";
import { Row } from "react-bootstrap";
import Dropdown from "rc-dropdown";
import Menu, { Item as MenuItem } from "rc-menu";
import "rc-dropdown/assets/index.css";
import Navbar from "./Navbar";

const HeaderBottom = ({ main_menu }: any) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>("Surat");
  const handleMenuClick = (info: any) => {
    setSelectedItem(`${info.key}`);
    setVisible(false);
  };

  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };

  const openCategoryPopup = () => {
    setIsPopupOpen(true);
  };

  const closeCategoryPopup = () => {
    setIsPopupOpen(false);
  };

  const menu = (
    <Menu
      className="select-options bb-dropdown-location"
      style={{
        display: "block",
        right: "-91px",
        top: "5px",
        borderRadius: "10px",
      }}
      onClick={handleMenuClick}
    >
      <MenuItem key="Surat">Surat</MenuItem>
      <MenuItem key="Delhi">Delhi</MenuItem>
      <MenuItem key="Rajkot">Rajkot</MenuItem>
      <MenuItem key="Udaipur">Udaipur</MenuItem>
    </Menu>
  );

  return (
    <>
      <div className="bb-main-menu-desk">
        <div className="container">
          <Row>
            <div className="col-12">
              <div className="bb-inner-menu-desk">
                <Link
                  onClick={openCategoryPopup}
                  href=""
                  className="bb-header-btn bb-sidebar-toggle bb-category-toggle"
                >
                  <svg
                    className="svg-icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M384 928H192a96 96 0 0 1-96-96V640a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96zM192 608a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V640a32 32 0 0 0-32-32H192zM784 928H640a96 96 0 0 1-96-96V640a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v144a32 32 0 0 1-64 0V640a32 32 0 0 0-32-32H640a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h144a32 32 0 0 1 0 64zM384 480H192a96 96 0 0 1-96-96V192a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96zM192 160a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32H192zM832 480H640a96 96 0 0 1-96-96V192a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96zM640 160a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32H640z" />
                  </svg>
                </Link>
                <button
                  className="navbar-toggler shadow-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <i className="ri-menu-2-line"></i>
                </button>
                <div className="bb-main-menu" id="navbarSupportedContent">
                  <Navbar main_menu={main_menu} />
                </div>
                <div className="bb-dropdown-menu">
                  <div className="inner-select">
                    <svg
                      className="svg-icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M511.614214 958.708971c-21.76163 0-41.744753-9.781784-54.865586-26.862811L222.50156 626.526383c-3.540639-4.044106-5.872754-7.978718-7.349385-10.461259-41.72838-58.515718-63.959707-127.685078-63.959707-199.699228 0.87288-193.650465 162.903184-351.075891 361.209691-351.075891 198.726064 0 360.40435 157.49194 360.40435 351.075891-0.839111 72.190159-23.070438 140.856052-64.345494 199.053522-1.962701 3.288906-4.312212 7.189749-7.735171 11.098779L566.479799 931.847184c-13.120832 17.080004-33.103956 26.861788-54.865585 26.861787zM273.525654 580.51956a33.707706 33.707706 0 0 1 2.63399 3.037173L511.278569 890.00931 747.068783 583.556733c0.435928-0.569982 0.889253-1.124614 1.358951-1.669013l2.51631-4.102434c0.285502-0.453325 0.587378-0.89744 0.889253-1.325182 33.507138-46.921659 51.577702-102.416578 52.248991-160.487158 0-155.294902-130.839931-281.95565-291.679105-281.95565-160.571069 0-291.780413 126.72931-292.484448 282.501073 0 57.450457 17.802458 112.811322 51.460022 159.933549l2.90312 4.580318c0.418532 0.73678-0.186242 0.032746-0.756223-0.512676z m476.059439 0.100284v0z m0.066515-0.058329c-0.016373 0.016373-0.033769 0.025583-0.033769 0.041956 0.001023-0.016373 0.017396-0.025583 0.033769-0.041956z m0.051166-0.041955a0.227174 0.227174 0 0 0-0.050142 0.041955c0.016373-0.016373 0.032746-0.033769 0.050142-0.041955z"
                        fill="#444444"
                      />
                      <path
                        d="M512 577.206094c-90.000803 0-163.222455-73.221652-163.222455-163.222455s73.221652-163.222455 163.222455-163.222455S675.222455 323.982836 675.222455 413.983639s-73.222675 163.222455-163.222455 163.222455z m0-240.538355c-42.634006 0-77.3159 34.68087-77.3159 77.3159s34.68087 77.3159 77.3159 77.3159 77.3159-34.681894 77.3159-77.3159-34.681894-77.3159-77.3159-77.3159z"
                        fill="#00D8A0"
                      />
                    </svg>
                    <div>
                      <Dropdown
                        trigger={["click"]}
                        overlay={menu}
                        animation="slide-up"
                        onVisibleChange={handleVisibleChange}
                        visible={visible}
                      >
                        <div className="location">
                          <div className="custom-select location-select">
                            {selectedItem}
                          </div>
                          <div
                            className="custom-select-arrow "
                            style={{
                              position: "absolute",
                              left: "105px",
                              top: "0",
                            }}
                          >
                            <i
                              style={{ fontSize: "30px" }}
                              className="ri-arrow-drop-down-line"
                            ></i>
                          </div>
                        </div>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </div>
      <CategoryPopup
        isPopupOpen={isPopupOpen}
        closeCategoryPopup={closeCategoryPopup}
      />
    </>
  );
};

export default HeaderBottom;
