"use client";

import dynamic from "next/dynamic";

export const poineerWholesaleMap: Record<string, any> = {
  hero: dynamic(() => import("./hero")),
  navbar: dynamic(() => import("./navbar")),
  "category-slider": dynamic(() => import("./category-slider")),
  "product-list": dynamic(() => import("./product-list")),
  "single-product": dynamic(() => import("./single-product")),
  "cart-section": dynamic(() => import("./cart-section")),
  "checkout-section": dynamic(() => import("./checkout-section")),
  "hero-banner": dynamic(() => import("./hero-banner")),
  "footer-section": dynamic(() => import("./footer")),
  "auth-template": dynamic(() => import("./auth-template")),
};
