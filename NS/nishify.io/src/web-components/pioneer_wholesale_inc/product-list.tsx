"use client";

import { useState } from "react";
import { ProductSidebar } from "./dynamic-components/new/product-sidebar";
import { cn } from "@/lib/utils";
import { ProductCard } from "./dynamic-components/new/product-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

/* ---------- Component ---------- */
export default function ProductList({}) {
  const [showGrid, setShowGrid] = useState(true);

  return (
    <>
      <>
        {/* Shop section */}
        <section className="section-shop pb-[50px] max-[1199px]:pb-[35px]">
          <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
            <div className="flex flex-wrap w-full mb-[-24px]">
              <div className="min-[992px]:w-[25%] w-full px-[12px] mb-[24px]">
                <ProductSidebar />
              </div>
              <div className="min-[992px]:w-[75%] w-full px-[12px] mb-[24px]">
                <div
                  className={
                    showGrid
                      ? "bb-shop-pro-inner "
                      : "bb-shop-pro-inner list-view-100"
                  }
                >
                  <div className="flex flex-wrap mx-[-12px] mb-[-24px]">
                    <div className="w-full px-[12px]">
                      <div className="bb-pro-list-top mb-[24px] rounded-[20px] flex bg-[#f8f8fb] border-[1px] border-solid border-[#eee] justify-between">
                        <div className="flex flex-wrap w-full">
                          <div className="w-[50%] px-[12px] max-[420px]:w-full">
                            <div className="bb-bl-btn py-[10px] flex max-[420px]:justify-center">
                              <Button
                                size={"icon"}
                                onClick={() => setShowGrid(true)}
                                variant={showGrid ? "default" : "secondary"}
                                type="button"
                                title="grid"
                                className="cursor-pointer"
                              >
                                <i className="ri-apps-line text-[20px]" />
                              </Button>
                              <Button
                                onClick={() => setShowGrid(false)}
                                variant={!showGrid ? "default" : "secondary"}
                                type="button"
                                size={"icon"}
                                title="grid"
                                className="cursor-pointer"
                              >
                                <i className="ri-list-unordered text-[20px]" />
                              </Button>
                            </div>
                          </div>
                          <div className="w-[50%] px-[12px] max-[420px]:w-full">
                            <div className="bb-select-inner h-full py-[10px] flex items-center justify-end max-[420px]:justify-center">
                              <Select defaultValue="ascending-by-name">
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Select Sorting" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="position">
                                    Position
                                  </SelectItem>
                                  <SelectItem value="relevance">
                                    Relevance
                                  </SelectItem>
                                  <SelectItem value="ascending-by-name">
                                    Name, A to Z
                                  </SelectItem>
                                  <SelectItem value="descending-by-name">
                                    Name, Z to A
                                  </SelectItem>
                                  <SelectItem value="ascending-by-price">
                                    Price, low to high
                                  </SelectItem>
                                  <SelectItem value="descending-by-price">
                                    Price, high to low
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {["", "", "", "", ""].map((_, index) => {
                      return (
                        <ProductCard
                          isGrid={showGrid}
                          key={index}
                          category="Hot and cool"
                          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas nihil laboriosam voluptatem ab consectetur dolorum id, soluta sunt at culpa commodi totam quod natus qui!"
                          gallery={[
                            "/assets/img/new-product/1.jpg",
                            "/assets/img/new-product/2.jpg",
                          ]}
                          label="New"
                          link="#"
                          price={500}
                          rating={4}
                          sale_price={300}
                          title="Ground Nuts Oil Pack"
                          weight="500g"
                        />
                      );
                    })}
                    <div className="w-full px-[12px]">
                      <div className="bb-pro-pagination mb-[24px] flex justify-between max-[575px]:flex-col max-[575px]:items-center">
                        <p className="font-Poppins min-w-max text-[15px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem] max-[575px]:mb-[10px]">
                          Showing 1-12 of 21 item(s)
                        </p>
                        <Pagination className="flex justify-end">
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious
                                className="transition-all duration-[0.3s] ease-in-out  h-[32px] px-[13px]  font-light bg-[#3d4750] text-white"
                                href="#"
                              />
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink
                                href="#"
                                className={cn(
                                  "transition-all duration-[0.3s] tracking-[0.03rem] ease-in-out h-[32px] px-[13px] w-[32px] font-light",
                                  true
                                    ? "bg-[#3d4750] text-white"
                                    : "border bg-slate-50"
                                )}
                              >
                                1
                              </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink
                                href="#"
                                className={cn(
                                  "transition-all duration-[0.3s] tracking-[0.03rem] ease-in-out h-[32px] px-[13px] w-[32px] font-light",
                                  false
                                    ? "bg-[#3d4750] text-white"
                                    : "border bg-slate-50"
                                )}
                              >
                                2
                              </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink
                                className={cn(
                                  "transition-all duration-[0.3s] tracking-[0.03rem] ease-in-out h-[32px] px-[13px] w-[32px] font-light",
                                  false
                                    ? "bg-[#3d4750] text-white"
                                    : "border bg-slate-50"
                                )}
                                href="#"
                              >
                                3
                              </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationNext
                                className="transition-all duration-[0.3s] ease-in-out  h-[32px] px-[13px] font-light text-[#fff] leading-[30px] bg-[#3d4750] tracking-[0.03rem] text-[15px]rounded-[10px] border-[1px] border-solid border-[#eee]"
                                href="#"
                              />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </>
  );
}
