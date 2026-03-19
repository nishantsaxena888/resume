import React from "react";
import { HeaderActionIcon } from "./header-action-icon";
import { ShoppingCartIcon, StarIcon, UserRoundIcon } from "lucide-react";
import Link from "next/link";

export const MiddleHeaderActions = ({
  setOpen,
  wishlist,
  cart,
  my_account,
  visibility,
}: any) => {
  return (
    <div className="bb-header-buttons h-full flex justify-end items-center">
      {visibility.my_account ? (
        <div className="bb-acc-drop relative">
          <HeaderActionIcon
            label={"Login"}
            link={my_account.link}
            icon={UserRoundIcon}
          >
            Account
          </HeaderActionIcon>
          <ul className="bb-dropdown-menu min-w-[150px] py-[10px] px-[5px] transition-all duration-[0.3s] ease-in-out mt-[25px] absolute z-[16] text-left opacity-[0] right-[auto] bg-[#fff] border-[1px] border-solid border-[#eee] block rounded-[10px]">
            {my_account.menu.map((item: any, index: number) => (
              <li
                key={index}
                className="py-[4px] px-[15px] m-[0] font-Poppins text-[15px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem]"
              >
                <Link
                  className="dropdown-item transition-all duration-[0.3s] ease-in-out font-Poppins text-[13px] hover:text-[#13151a] leading-[22px] block w-full font-normal tracking-[0.03rem]"
                  href={item.link}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {visibility.wishlist ? (
        <HeaderActionIcon
          label={wishlist.label}
          link={cart.link}
          icon={StarIcon}
        >
          <b className="bb-wishlist-count">3</b> items
        </HeaderActionIcon>
      ) : null}
      {visibility.cart ? (
        <HeaderActionIcon
          label={cart.label}
          link={cart.link}
          icon={ShoppingCartIcon}
        >
          <b className="bb-cart-count">4</b> items
        </HeaderActionIcon>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="bb-toggle-menu hidden max-[991px]:flex max-[991px]:ml-[20px]"
      >
        <div className="header-icon">
          <i className="ri-menu-3-fill text-[22px] text-primary" />
        </div>
      </button>
    </div>
  );
};
