"use client";

import dynamic from "next/dynamic";

const render: Record<string, any> = {
  // navbar: dynamic(() => import("./navbar")),
  "auth-template": dynamic(
    () => import("../components/auth-template/auth-template")
  ),
  "product-details": dynamic(
    () => import("../components/products-section/Products")
  ),
  "hero-slider": dynamic(() => import("../components/hero/HeroSlider")),
  "product-list": dynamic(() => import("../components/shop/Shop")),
  "checkout-template": dynamic(() => import("../components/login/Checkout")),
  "explore-category": dynamic(
    () => import("../components/category/ExploreCategory")
  ),
  "deal-slider": dynamic(() => import("../components/deal-slider/DealSlider")),
  breadcrumb: dynamic(() => import("../components/breadcrumb/Breadcrumb")),
  "cart-template": dynamic(
    () => import("../components/cart/cart-section/Cart")
  ),
};

export default render;
