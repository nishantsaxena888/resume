import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Rating } from "./rating-component";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ProductCard = ({
  label,
  title,
  gallery,
  category,
  link,
  description,
  sale_price,
  price,
  weight,
  rating,
  isGrid,
}: {
  label: string;
  title: string;
  gallery: string[];
  category: string;
  link: string;
  description: string;
  sale_price: number;
  price: number;
  weight: string;
  rating: number;
  isGrid?: boolean;
}) => {
  const actions_list = [
    {
      key: "wishlist",
      label: "Wishlist",
      icon: "ri-heart-line",
    },
    {
      key: "quick-view",
      label: "Quick View",
      icon: "ri-eye-line",
    },
    {
      key: "compare",
      label: "Compare",
      icon: "ri-repeat-line",
    },
    {
      key: "add-to-cart",
      label: "Add to Cart",
      icon: "ri-shopping-bag-4-line",
    },
  ];

  const actions = (value: any) => {
    console.log(value);
    switch (value) {
      case "wishlist":
        toast.success(`${title} is added to wishlist.`);
        break;
      case "quick-view":
        // toast("Event has been created.");

        break;
      case "compare":
        toast.success(`${title} is added to compare.`);
        break;
      case "add-to-cart":
        toast.success(`${title} is added to cart.`);

        break;
      default:
        break;
    }
  };

  return (
    <div
      className={
        isGrid
          ? "min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-full px-[12px] mb-[24px] pro-bb-content aos-init aos-animate "
          : "min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-full px-[12px] mb-[24px] pro-bb-content aos-init aos-animate width-100"
      }
      data-aos="fade-up"
      data-aos-duration={1000}
      data-aos-delay={200}
      data-aos-once="true"
    >
      <div className="bb-pro-box bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[20px]">
        <div className="bb-pro-img overflow-hidden relative border-b-[1px] border-solid border-[#eee] z-[4]">
          <span className="flags transition-all duration-[0.3s] ease-in-out absolute z-[5] top-[10px] left-[6px]">
            <span className="text-[14px] text-[#777] font-medium uppercase">
              {label}
            </span>
          </span>
          <Link href="javascript:void(0)">
            <div className="inner-img relative block overflow-hidden pointer-events-none rounded-t-[20px]">
              {gallery?.[0] ? (
                <Image
                  width={500}
                  height={500}
                  className="main-img transition-all duration-[0.3s] ease-in-out w-full"
                  src={gallery?.[0]}
                  alt="product-1"
                />
              ) : null}
              {gallery?.[1] ? (
                <Image
                  width={500}
                  height={500}
                  className="hover-img transition-all duration-[0.3s] ease-in-out absolute z-[2] top-[0] left-[0] opacity-[0] w-full"
                  src={gallery?.[1]}
                  alt="product-1"
                />
              ) : null}
            </div>
          </Link>
          <ul className="bb-pro-actions transition-all duration-[0.3s] ease-in-out my-[0] mx-[auto] absolute z-[9] left-[0] right-[0] bottom-[0] flex flex-row items-center justify-center opacity-[0]">
            {actions_list.map((item: any, index: number) => (
              <li
                key={index}
                className="transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center  bg-[#fff] hover:bg-primary  border-[1px] border-solid border-[#eee] hover:border-primary hover:text-[#fff] rounded-[10px]"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => actions(item.key)}
                      className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer"
                    >
                      <i
                        className={cn(
                          "transition-all duration-[0.3s] ease-in-out text-[18px] text-inherit leading-[10px]",
                          item.icon
                        )}
                      />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </li>
            ))}
          </ul>
        </div>
        <div className="bb-pro-contact p-[20px]">
          <div className="bb-pro-subtitle mb-[8px] flex flex-wrap justify-between">
            <Link
              href="shop-left-sidebar-col-3.html"
              className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[13px] leading-[16px] text-[#777] font-light tracking-[0.03rem]"
            >
              {category}
            </Link>

            <Rating value={rating} />
          </div>
          <h4 className="bb-pro-title mb-[8px] text-[16px] leading-[18px]">
            <Link
              href={link}
              className="transition-all duration-[0.3s] ease-in-out font-quicksand w-full block whitespace-nowrap overflow-hidden text-ellipsis text-[15px] leading-[18px] text-[#3d4750] font-semibold tracking-[0.03rem]"
            >
              {title}
            </Link>
          </h4>
          <p className="hidden font-Poppins text-[14px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem]">
            {description}
          </p>
          <div className="bb-price flex flex-wrap justify-between">
            <div className="inner-price mx-[-3px]">
              <span className="new-price px-[3px] text-[16px] text-[#686e7d] font-bold">
                {sale_price}
              </span>
              <span className="old-price px-[3px] text-[14px] text-[#686e7d] line-through">
                {price}
              </span>
            </div>
            <span className="last-items text-[14px] text-[#686e7d]">
              {weight}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
