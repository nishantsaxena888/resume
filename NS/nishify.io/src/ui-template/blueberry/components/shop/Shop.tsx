"use client";
import React, { useState } from "react";
import ShopProductItemCard from "../item/ShopProductItemCard";
import { Fade } from "react-awesome-reveal";
import Spinner from "../spinner/Spinner";
import { Col, Row } from "react-bootstrap";
import GenericFormV2 from "@/components/admin/generic-form-v2";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEntityList } from "@/hooks";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";

const sortOptions = [
  {
    value: "popularity",
    label: "Popularity",
    sortKey: "popularity",
    dir: "desc",
  },
  { value: "rating", label: "Rating", sortKey: "rating", dir: "desc" },
  { value: "date", label: "Date", sortKey: "cts", dir: "desc" }, // cts = created timestamp (adjust if different)
  {
    value: "price_asc",
    label: "Price: Low → High",
    sortKey: "price",
    dir: "asc",
  },
  {
    value: "price_desc",
    label: "Price: High → Low",
    sortKey: "price",
    dir: "desc",
  },
];

const Shop = ({ col, lg }: any) => {
  // Server mode so the hook sends `page` and `size` to your API.
  const ctl = useEntityList("item", { mode: "server" });

  const [isGridView, setIsGridView] = useState(false);
  const [sortValue, setSortValue] = useState<string>("popularity");

  // LEFT FILTER FORM → update hook filters
  const handleFilterChange = (filtersPayload: any) => {
    // Expecting GenericFormV2 to give back an object like { brand: '...', category_id: 1, min_price: 10, ... }
    // Map that object to your hook filter shape as needed:
    // e.g. price range → { price: { op: 'gte', value: 100 } }
    // For now, pass through simple equals if primitive:
    const mapped: Record<string, any> = {};
    Object.entries(filtersPayload || {}).forEach(([k, v]) => {
      if (v === undefined || v === null || v === "") return;
      // If it looks like a range, adapt here; example:
      // if (k === "min_price") mapped.price = { op: "gte", value: v };
      // else if (k === "max_price") mapped.price = { op: "lte", value: v };
      // else:
      mapped[k] = v;
    });
    ctl.updateFilters(mapped);
    ctl.setPage(1);
  };

  // SORT SELECT → set sortKey/sortDir
  const handleSortChange = (v: string) => {
    setSortValue(v);
    const opt = sortOptions.find((o) => o.value === v);
    if (opt) {
      ctl.setSortKey(opt.sortKey);
      ctl.setSortDir(opt.dir as "asc" | "desc");
      ctl.setPage(1);
    }
  };

  const showingFrom = ctl.effectiveTotal === 0 ? 0 : ctl.startIndex + 1;
  const showingTo = ctl.startIndex + ctl.pageItems.length;

  return (
    <section className="section-shop padding-b-50">
      <div className="container">
        <Row className="mb-minus-24">
          {/* LEFT FILTERS */}
          <Col lg={3} col={12} className="mb-24">
            <div className="bb-shop-wrap sticky top-0">
              <GenericFormV2
                entity="inventory_filter"
                onAutoSave={handleFilterChange}
              />
            </div>
          </Col>

          {/* RIGHT LIST */}
          <Col lg={9} col={12} className="mb-24">
            <div className="bb-shop-pro-inner">
              <Row className="mb-minus-24">
                {/* TOP BAR */}
                <Col sm={12}>
                  <div className="bb-pro-list-top">
                    <Row>
                      <Col className="col-6">
                        <div className="bb-bl-btn">
                          <button
                            onClick={() => setIsGridView(false)}
                            type="button"
                            className={`grid-btn btn-grid-100 ${
                              !isGridView ? "active" : ""
                            }`}
                          >
                            <i className="ri-apps-line"></i>
                          </button>
                          <button
                            onClick={() => setIsGridView(true)}
                            type="button"
                            className={`grid-btn btn-grid-100 ${
                              isGridView ? "active" : ""
                            }`}
                          >
                            <i className="ri-list-unordered"></i>
                          </button>
                        </div>
                      </Col>
                      <Col className="col-6">
                        <div className="bb-select-inner flex justify-end">
                          <Select
                            value={sortValue}
                            onValueChange={handleSortChange}
                          >
                            <SelectTrigger className="w-[220px]">
                              <SelectValue placeholder="Sort by…" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {sortOptions.map((item) => (
                                  <SelectItem
                                    key={item.value}
                                    value={item.value}
                                  >
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>

                {/* LIST / GRID */}
                {ctl.loading ? (
                  <div className="w-full py-10 flex justify-center">
                    <Spinner />
                  </div>
                ) : ctl.pageItems.length === 0 ? (
                  <Col sm={12} className="py-10">
                    <div style={{ textAlign: "center" }}>
                      Products not found.
                    </div>
                  </Col>
                ) : (
                  <Fade
                    triggerOnce
                    direction="up"
                    duration={600}
                    delay={80}
                    className={`col-md-${col} ${lg} col-lg-4 col-6 mb-24 bb-product-box pro-bb-content ${
                      isGridView ? "width-100 pro-bb-content" : ""
                    }`}
                  >
                    {ctl.pageItems.map((item: any, index: number) => (
                      <ShopProductItemCard
                        key={item?.id ?? index}
                        data={{
                          ...item,
                          title: item?.name,
                          sale: "New",
                          imageTwo: "/assets/blueberry/img/product/back-1.jpg",
                          category: item?.category?.name,
                          oldPrice: item.default_price + 2,
                          newPrice: item.default_price,
                          location: "In Store",
                          brand: "Bhisma Organics",
                          sku: 24433,
                          itemLeft: "",
                          rating: 4,
                          status: "In Stock",
                          weight: "1 Pack",
                        }}
                      />
                    ))}
                  </Fade>
                )}

                {/* PAGINATION */}
                <Col sm={12}>
                  <div className="bb-pro-pagination">
                    <div className="mt-3 flex px-4 flex-col items-center gap-3 md:flex-row md:justify-between text-muted-foreground">
                      <div className="flex items-center gap-3 text-sm">
                        <span className="inline-block min-w-max">
                          Rows per page
                        </span>
                        <Select
                          value={String(ctl.pageSize)}
                          onValueChange={(v) => ctl.setPageSize(Number(v))}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Select page size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {[2, 10, 25, 50, 100].map((n) => (
                                <SelectItem key={n} value={String(n)}>
                                  {n}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>

                        <span className="inline-block min-w-max tabular-nums">
                          Showing {showingFrom}-{showingTo} of{" "}
                          {ctl.effectiveTotal}
                        </span>

                        <span className="inline-block min-w-max tabular-nums">
                          Page {ctl.curPage} / {ctl.totalPages}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => ctl.setPage(1)}
                          disabled={ctl.curPage === 1 || ctl.loading}
                          aria-label="First page"
                        >
                          <ChevronsLeftIcon />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() =>
                            ctl.setPage((p: number) => Math.max(1, p - 1))
                          }
                          disabled={ctl.curPage === 1 || ctl.loading}
                          aria-label="Previous page"
                        >
                          <ChevronLeftIcon />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() =>
                            ctl.setPage((p: number) =>
                              Math.min(ctl.totalPages, p + 1)
                            )
                          }
                          disabled={
                            ctl.curPage >= ctl.totalPages || ctl.loading
                          }
                          aria-label="Next page"
                        >
                          <ChevronRightIcon />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => ctl.setPage(ctl.totalPages)}
                          disabled={
                            ctl.curPage >= ctl.totalPages || ctl.loading
                          }
                          aria-label="Last page"
                        >
                          <ChevronsRightIcon />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Shop;
