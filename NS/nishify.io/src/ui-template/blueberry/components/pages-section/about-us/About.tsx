"use client";
import React from "react";
import AboutMe from "./section/AboutMe";
import Testimonials from "@/ui-template/blueberry/components/testimonials/Testimonials";
import Team from "./section/Team";
import PageServices from "./section/PageServices";

const About = () => {
  return (
    <>
      <AboutMe />
      <PageServices />
      <Testimonials />
      <Team />
    </>
  );
};

export default About;
