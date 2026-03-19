import React from "react";
import { Fade } from "react-awesome-reveal";
import ScrollButton from "../loader/ScrollButton";
import { Col, Row } from "react-bootstrap";
import FooterColumn from "./footer/FooterColumn";
import { FooterAccordion } from "./footer/footer-accordion";
import { FooterContact } from "./footer/footer-contact";
import { FooterSocial } from "./footer/footer-social";
import { FooterAbout } from "./footer/footer-about";
import { FooterCopyright } from "./footer/FooterCopyright";
import FooterLinks from "./footer/footer-links";

const Footer = ({
  top_footer,
  middle_footer,
  bottom_footer,
  visibility,
}: any) => {
  return (
    <>
      {visibility?.scroll_to_top ? <ScrollButton /> : null}

      <footer className="bb-footer margin-t-50">
        {visibility?.top_footer && top_footer ? (
          <div className="footer-directory padding-tb-50">
            <div className="container">
              <Row>
                <div className="col-12">
                  <Fade triggerOnce direction="up" duration={1000} delay={200}>
                    <div className="directory-title">
                      <h4>{top_footer.title}</h4>
                    </div>
                    <div className="directory-contact">
                      <Row>
                        {top_footer.links_list.map(
                          (item: any, index: number) => (
                            <Col lg={6} key={index} className="col-12">
                              <FooterLinks
                                list={item.links}
                                title={item.title}
                              />
                            </Col>
                          )
                        )}
                      </Row>
                    </div>
                  </Fade>
                </div>
              </Row>
            </div>
          </div>
        ) : null}
        <div className="footer-container">
          {visibility?.middle_footer && middle_footer ? (
            <div className="footer-top padding-tb-50">
              <div className="container">
                <Row className="m-minus-991">
                  <Col lg={3} className="bb-footer-cat col-12">
                    {middle_footer?.about ? (
                      <FooterAbout {...middle_footer.about} />
                    ) : null}
                  </Col>
                  <Col lg={2} className="bb-footer-info col-12">
                    {middle_footer?.category ? (
                      <FooterAccordion title={middle_footer.category.title}>
                        <FooterColumn list={middle_footer.category.links} />
                      </FooterAccordion>
                    ) : null}
                  </Col>
                  <Col lg={2} className="bb-footer-account col-12">
                    {middle_footer?.company ? (
                      <FooterAccordion title={middle_footer.company.title}>
                        <FooterColumn list={middle_footer.company.links} />
                      </FooterAccordion>
                    ) : null}
                  </Col>
                  <Col lg={2} className="bb-footer-service col-12">
                    {middle_footer.account ? (
                      <FooterAccordion title={middle_footer.account.title}>
                        <FooterColumn list={middle_footer.account.links} />
                      </FooterAccordion>
                    ) : null}
                  </Col>
                  <Col lg={3} className="bb-footer-cont-social col-12">
                    {middle_footer.contact ? (
                      <FooterAccordion title={middle_footer.contact.title}>
                        <FooterContact list={middle_footer.contact.items} />
                      </FooterAccordion>
                    ) : null}
                    {middle_footer?.social?.items ? (
                      <FooterSocial list={middle_footer?.social?.items} />
                    ) : null}
                  </Col>
                </Row>
              </div>
            </div>
          ) : null}
          {visibility?.bottom_footer && bottom_footer ? (
            <div className="footer-bottom">
              <div className="container">
                <Row>
                  <div className="bb-bottom-info">
                    <div className="footer-copy">
                      <div className="footer-bottom-copy ">
                        <div className="bb-copy">
                          {bottom_footer.copyright ? (
                            <FooterCopyright {...bottom_footer.copyright} />
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="footer-bottom-right">
                      <div className="footer-bottom-payment d-flex justify-content-center">
                        <div className="payment-link">
                          {bottom_footer.payment_logo.url ? (
                            <img
                              src={bottom_footer.payment_logo.url}
                              alt={bottom_footer.payment_logo.alt}
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </Row>
              </div>
            </div>
          ) : null}
        </div>
      </footer>
    </>
  );
};

export default Footer;
