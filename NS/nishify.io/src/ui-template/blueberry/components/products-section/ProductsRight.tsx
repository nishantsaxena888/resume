/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import ShopSidebar from "../shop/sidebar-section/ShopSidebar";
import ProductsDetails from "./Products-Detail/ProductsDetails";
import ProductsTabs from "./Products-Tabs/ProductsTabs";
// import { useDispatch, useSelector } from 'react-redux'
// import { setRange, setSelectedCategory, setSelectedColor, setSelectedTags, setSelectedWeight } from '@/store/reducer/filterReducer'
// import { RootState } from '@/store'
import { Col } from "react-bootstrap";

const ProductsRight = () => {
  // const { minPrice, maxPrice, selectedCategory, selectedColor, selectedTags, selectedWeight } = useSelector((state: RootState) => state.filter)
  // const dispatch = useDispatch()

  // const handlePriceChange = useCallback(
  //     (min: number, max: number) => {
  //         dispatch(setRange({ min, max }));
  //     },
  //     [dispatch]
  // );

  const handleCategoryChange = (_category: any) => {
    // const updatedCategory = selectedCategory.includes(category)
    //     ? selectedCategory.filter((cat: any) => cat !== category)
    //     : [...selectedCategory, category];
    // dispatch(setSelectedCategory(updatedCategory));
  };

  const handleWeightChange = (_weight: any) => {
    // const updatedweight = selectedWeight.includes(weight)
    //     ? selectedWeight.filter((wet: any) => wet !== weight)
    //     : [...selectedWeight, weight];
    // dispatch(setSelectedWeight(updatedweight));
  };

  const handleColorChange = (_color: any) => {
    // const updatedcolor = selectedColor.includes(color)
    //     ? selectedColor.filter((clr: any) => clr !== color)
    //     : [...selectedColor, color];
    // dispatch(setSelectedColor(updatedcolor));
  };

  const handleTagsChange = (_tag: any) => {
    // const updatedtag = selectedTags.includes(tag)
    //     ? selectedTags.filter((tg: any) => tg !== tag)
    //     : [...selectedTags, tag];
    // dispatch(setSelectedTags(updatedtag));
  };
  return (
    <>
      <Col lg={9} sm={12} className="mb-24">
        <ProductsDetails />
        <ProductsTabs />
      </Col>
      <Col lg={3} sm={12} className="mb-24">
        <ShopSidebar
          handleCategoryChange={handleCategoryChange}
          selectedCategory={[]}
          handleColorChange={handleColorChange}
          selectedColor={[]}
          handleTagsChange={handleTagsChange}
          selectedTags={[]}
          handleWeightChange={handleWeightChange}
          selectedWeight={[]}
          handlePriceChange={[]}
          min={500}
          max={5000}
        />
      </Col>
    </>
  );
};

export default ProductsRight;
