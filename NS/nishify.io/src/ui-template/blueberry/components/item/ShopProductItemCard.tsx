/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useMemo, useState } from "react";
import StarRating from "../stars/StarRating";
import ItemModal from "../modal/ItemModal";
import Link from "next/link";
import { useCart } from "../../store/use-cart";
import { showSuccessToast } from "../toast-popup/Toastify";

interface Item {
  id: number;
  title: string;
  newPrice: number;
  weight: string;
  image?: any;
  gallery?: any;
  date?: string;
  status?: string;
  rating?: number;
  oldPrice?: number | null;
  location?: string;
  brand?: string;
  sku?: number;
  category?: string;
  quantity?: number;
  short_description?: string;
  sale?: string | number | null;
  itemLeft?: string | number | null;
}

/** ✅ universal safe extractor for any image format **/
function extractImageUrl(input: any): string {
  const fallback = "/assets/blueberry/img/product/1.jpg";

  if (!input) return fallback;

  // 1️⃣ Direct object
  if (typeof input === "object" && input.url) return input.url;

  // 2️⃣ Stringified JSON
  if (typeof input === "string") {
    try {
      const parsed = JSON.parse(input);
      if (Array.isArray(parsed) && parsed[0]?.url) return parsed[0].url;
      if (parsed?.url) return parsed.url;
    } catch {
      // 3️⃣ Plain URL string
      if (input.startsWith("http")) return input;
      if (input.includes("/doc/")) return input; // from your backend
    }
  }

  // 4️⃣ Array of images
  if (Array.isArray(input) && input[0]?.url) return input[0].url;

  return fallback;
}

const ShopProductItemCard = ({ data }: { data: Item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const add = useCart((s) => s.add_to_cart);

  const openItemModal = () => setIsModalOpen(true);
  const closeItemModal = () => setIsModalOpen(false);

  // ✅ Extract main + hover images safely
  const image_url = useMemo(() => extractImageUrl(data.image), [data.image]);
  const image_url_two = useMemo(
    () => extractImageUrl(data.gallery),
    [data.gallery]
  );

  const handleCart = (data: Item) => {
    add({
      id: "" + data.id,
      name: data.title,
      image: image_url,
      quantity: 1,
      price: data.newPrice,
      weight: 1,
    });
    showSuccessToast(`${data.title ?? "Item"} added to cart`);
  };

  const handleWishlist = (data: Item) => {
    showSuccessToast(`${data.title ?? "Item"} added to wishlist`);
  };

  const handleCompareItem = (data: Item) => {
    showSuccessToast("Item added to compare list");
  };

  return (
    <>
      <div className="bb-pro-box">
        <div className="bb-pro-img">
          <span className="flags">
            {data.sale ? <span>{data.sale}</span> : null}
          </span>

          <div className="inner-img">
            <img
              className="main-img h-full object-cover"
              src={image_url}
              alt={data.title || "product"}
              onError={(e) =>
                ((e.target as HTMLImageElement).src =
                  "/assets/blueberry/img/product/1.jpg")
              }
            />
            <img
              className="hover-img h-full object-cover"
              src={image_url_two}
              alt={data.title || "product-hover"}
              onError={(e) =>
                ((e.target as HTMLImageElement).src =
                  "/assets/blueberry/img/product/1.jpg")
              }
            />
          </div>

          <ul className="bb-pro-actions">
            <li className="bb-btn-group">
              <span onClick={() => handleWishlist(data)} title="Wishlist">
                <i className="ri-heart-line"></i>
              </span>
            </li>
            <li className="bb-btn-group">
              <span
                onClick={openItemModal}
                data-link-action="quickview"
                title="Quick View"
                data-bs-toggle="modal"
                data-bs-target="#bry_quickview_modal"
              >
                <i className="ri-eye-line"></i>
              </span>
            </li>
            <li className="bb-btn-group">
              <a onClick={() => handleCompareItem(data)} title="Compare">
                <i className="ri-repeat-line"></i>
              </a>
            </li>
            <li className="bb-btn-group">
              <a onClick={() => handleCart(data)} title="Add To Cart">
                <i className="ri-shopping-bag-4-line"></i>
              </a>
            </li>
          </ul>
        </div>

        <div className="bb-pro-contact">
          <div className="bb-pro-subtitle">
            <Link href={`/item/${data.id}`}>{data.category}</Link>
            <StarRating rating={data.rating ?? 0} />
          </div>

          <h4 className="bb-pro-title">
            <Link href={`/item/${data.id}`}>{data.title}</Link>
          </h4>

          {data.short_description && (
            <div
              className="short-description"
              dangerouslySetInnerHTML={{ __html: data.short_description }}
            />
          )}

          <div className="bb-price">
            <div className="inner-price">
              <span className="new-price">${data.newPrice}</span>
              <span className={`${data.oldPrice ? "old-price" : "item-left"}`}>
                {data.oldPrice ? `$${data.oldPrice}` : data.itemLeft ?? ""}
              </span>
            </div>
            <span className="last-items">{data.weight}</span>
          </div>
        </div>
      </div>

      <ItemModal
        data={data}
        isModalOpen={isModalOpen}
        closeItemModal={closeItemModal}
      />
    </>
  );
};

export default ShopProductItemCard;










// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";
// import React, { useMemo, useState } from "react";
// import StarRating from "../stars/StarRating";
// import ItemModal from "../modal/ItemModal";
// import Link from "next/link";
// import { useCart } from "../../store/use-cart";
// import { showSuccessToast } from "../toast-popup/Toastify";

// interface Item {
//   id: number;
//   title: string;
//   newPrice: number;
//   weight: string;
//   image: any;
//   gallery?: any;
//   date?: string;
//   status?: string;
//   rating?: number;
//   oldPrice?: number | null;
//   location?: string;
//   brand?: string;
//   sku?: number;
//   category?: string;
//   quantity?: number;
//   short_description?: string;
//   // --- added optional fields to avoid TS errors ---
//   sale?: string | number | null;
//   itemLeft?: string | number | null;
// }

// const ShopProductItemCard = ({ data }: { data: Item }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const add = useCart((s) => s.add_to_cart);

//   const openItemModal = () => setIsModalOpen(true);
//   const closeItemModal = () => setIsModalOpen(false);

//   const image_url = useMemo(() => {
//     if (!data?.image) return "/assets/blueberry/img/product/1.jpg";

//     if (typeof data.image === "object" && data.image?.url) return data.image.url;

//     try {
//       const parsed = JSON.parse(String(data.image));
//       return parsed?.url || "/assets/blueberry/img/product/1.jpg";
//     } catch {
//       return typeof data.image === "string" && data.image.startsWith("http")
//         ? data.image
//         : "/assets/blueberry/img/product/1.jpg";
//     }
//   }, [data.image]);

//   const image_url_two = useMemo(() => {
//     if (!data?.gallery) return "/assets/blueberry/img/product/1.jpg";

//     if (Array.isArray(data.gallery) && data.gallery[0]?.url) return data.gallery[0].url;

//     try {
//       const parsed = JSON.parse(String(data.gallery));
//       if (Array.isArray(parsed) && parsed[0]?.url) return parsed[0].url;
//     } catch {
//       /* ignore */
//     }

//     return "/assets/blueberry/img/product/1.jpg";
//   }, [data.gallery]);

//   const handleCart = (data: Item) => {
//     add({
//       id: "" + data.id,
//       name: data.title,
//       image: image_url,
//       quantity: 1,
//       price: data.newPrice,
//       weight: 1,
//     });
//     showSuccessToast((data.title ?? "Item") + " added to cart");
//   };

//   const handleWishlist = (data: Item) => {
//     showSuccessToast((data.title ?? "Item") + " added to wishlist");
//   };

//   const handleCompareItem = (data: Item) => {
//     showSuccessToast("Item added to compare list");
//   };

//   return (
//     <>
//       <div className="bb-pro-box">
//         <div className="bb-pro-img">
//           <span className="flags">
//             {/* render sale only if present */}
//             {data.sale != null ? <span>{data.sale}</span> : null}
//           </span>

//           <div className="inner-img">
//             <img
//               className="main-img h-full object-cover"
//               src={image_url}
//               alt={data.title || "product"}
//             />
//             <img
//               className="hover-img h-full object-cover"
//               src={image_url_two}
//               alt={data.title || "product-hover"}
//             />
//           </div>

//           <ul className="bb-pro-actions">
//             <li className="bb-btn-group">
//               <span onClick={() => handleWishlist(data)} title="Wishlist">
//                 <i className="ri-heart-line"></i>
//               </span>
//             </li>
//             <li className="bb-btn-group">
//               <span
//                 onClick={openItemModal}
//                 data-link-action="quickview"
//                 title="Quick View"
//                 data-bs-toggle="modal"
//                 data-bs-target="#bry_quickview_modal"
//               >
//                 <i className="ri-eye-line"></i>
//               </span>
//             </li>
//             <li className="bb-btn-group">
//               <a onClick={() => handleCompareItem(data)} title="Compare">
//                 <i className="ri-repeat-line"></i>
//               </a>
//             </li>
//             <li className="bb-btn-group">
//               <a onClick={() => handleCart(data)} title="Add To Cart">
//                 <i className="ri-shopping-bag-4-line"></i>
//               </a>
//             </li>
//           </ul>
//         </div>

//         <div className="bb-pro-contact">
//           <div className="bb-pro-subtitle">
//             <Link href={`/item/${data.id}`}>{data.category}</Link>
//             <StarRating rating={data.rating ?? 0} />
//           </div>

//           <h4 className="bb-pro-title">
//             <Link href={`/item/${data.id}`}>{data.title}</Link>
//           </h4>

//           {data.short_description && (
//             <div
//               className="short-description"
//               dangerouslySetInnerHTML={{ __html: data.short_description }}
//             />
//           )}

//           <div className="bb-price">
//             <div className="inner-price">
//               <span className="new-price">${data.newPrice}</span>
//               <span className={`${data.oldPrice ? "old-price" : "item-left"}`}>
//                 {/* safe rendering for itemLeft */}
//                 {data.oldPrice ? `$${data.oldPrice}` : (data.itemLeft ?? "")}
//               </span>
//             </div>
//             <span className="last-items">{data.weight}</span>
//           </div>
//         </div>
//       </div>

//       <ItemModal
//         data={data}
//         isModalOpen={isModalOpen}
//         closeItemModal={closeItemModal}
//       />
//     </>
//   );
// };

// export default ShopProductItemCard;














































// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";
// import React, { /* useEffect, */ useMemo, useState } from "react";
// import StarRating from "../stars/StarRating";
// // import { useDispatch, useSelector } from 'react-redux';
// // import { RootState } from '@/store';
// // import { addItem, updateItemQuantity } from '@/store/reducer/cartSlice';
// // import { showErrorToast, showSuccessToast } from '../toast-popup/Toastify';
// // import { addWishlist } from '@/store/reducer/wishlistSlice';
// // import { addCompare } from '@/store/reducer/compareSlice';
// import ItemModal from "../modal/ItemModal";
// import Link from "next/link";
// import { useCart } from "../../store/use-cart";
// // import { da } from "date-fns/locale";
// import {
//   /* showErrorToast, */ showSuccessToast,
// } from "../toast-popup/Toastify";
// import { getImages } from "@/lib/utils";

// interface Item {
//   id: number;
//   title: string;
//   newPrice: number;
//   weight: string;
//   image: string;
//   imageTwo: string;
//   date: string;
//   status: string;
//   rating: number;
//   oldPrice: number;
//   location: string;
//   brand: string;
//   sku: number;
//   category: string;
//   quantity: number;
//   gallery?: any;
// }

// const ShopProductItemCard = ({ data }: any) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const add = useCart((s) => s.add_to_cart);

//   const openItemModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeItemModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleCart = (data: Item) => {
//     console.log({ data });
//     add({
//       id: "" + data.id,
//       name: data.title,
//       image: getImages(data.image)?.url,
//       quantity: 1, // quantity in cart
//       price: data.newPrice,
//       weight: 1,
//     });
//     showSuccessToast(data.title + "  added to cart");

//     // showErrorToast("Item already have to compare list");
//   };

//   const handleWishlist = (data: Item) => {
//     showSuccessToast(data.title + "  added to wishlist");

//     // const isItemInWishlist = wishlistItem.some(
//     //     (item: Item) => item.id === data.id
//     // );
//     // if (!isItemInWishlist) {
//     //     dispatch(addWishlist(data));
//     //     showSuccessToast("Item added to wishlist");
//     // } else {
//     //     showErrorToast("Item already have to wishlist");
//     // }
//   };

//   const handleCompareItem = (data: Item) => {
//     // const isItemInCompare = compareItems.some(
//     //     (item: Item) => item.id === data.id
//     // );
//     // if (!isItemInCompare) {
//     //     dispatch(addCompare(data));
//     showSuccessToast("Item added to compare list");
//     // } else {
//     //     showErrorToast("Item already have to compare list");
//     // }
//   };

//   const image_url = useMemo(() => {
//     try {
//       const temp_image = JSON.parse(data.image);
//       return temp_image?.url || "/assets/blueberry/img/product/1.jpg";
//     } catch (error) {
//       return "/assets/blueberry/img/product/1.jpg";
//     }
//   }, [data.image]);

//   const image_url_two = useMemo(() => {
//     try {
//       const temp_image = JSON.parse(data.gallery);
//       console.log(temp_image);
//       return temp_image?.[0]?.url || "/assets/blueberry/img/product/1.jpg";
//     } catch (error) {
//       return "/assets/blueberry/img/product/1.jpg";
//     }
//   }, [data.gallery]);

//   return (
//     <>
//       <div className="bb-pro-box">
//         <div className="bb-pro-img">
//           <span className="flags">
//             <span>{data.sale}</span>
//           </span>
//           <div className="inner-img">
//             <img
//               className="main-img h-full object-cover"
//               src={image_url}
//               alt="product-1"
//             />
//             <img
//               className="hover-img h-full object-cover"
//               src={image_url_two}
//               alt="product-1"
//             />
//           </div>
//           <ul className="bb-pro-actions">
//             <li className="bb-btn-group">
//               <span onClick={() => handleWishlist(data)} title="Wishlist">
//                 <i className="ri-heart-line"></i>
//               </span>
//             </li>
//             <li className="bb-btn-group">
//               <span
//                 onClick={openItemModal}
//                 data-link-action="quickview"
//                 title="Quick View"
//                 data-bs-toggle="modal"
//                 data-bs-target="#bry_quickview_modal"
//               >
//                 <i className="ri-eye-line"></i>
//               </span>
//             </li>
//             <li className="bb-btn-group">
//               <a onClick={() => handleCompareItem(data)} title="Compare">
//                 <i className="ri-repeat-line"></i>
//               </a>
//             </li>
//             <li className="bb-btn-group">
//               <a onClick={() => handleCart(data)} title="Add To Cart">
//                 <i className="ri-shopping-bag-4-line"></i>
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div className="bb-pro-contact">
//           <div className="bb-pro-subtitle">
//             <Link href={`/item/${data.id}`}>{data.category}</Link>
//             <StarRating rating={data.rating} />
//           </div>
//           <h4 className="bb-pro-title">
//             <Link href={`/item/${data.id}`}>{data.title}</Link>
//           </h4>
//           <div
//             className="short-description"
//             dangerouslySetInnerHTML={{ __html: data.short_description }}
//           />
//           <div className="bb-price">
//             <div className="inner-price">
//               <span className="new-price">${data.newPrice}</span>
//               <span className={`${data.oldPrice ? "old-price" : "item-left"}`}>
//                 {data.oldPrice ? `$${data.oldPrice}` : data.itemLeft}
//               </span>
//             </div>
//             <span className="last-items">{data.weight}</span>
//           </div>
//         </div>
//       </div>
//       <ItemModal
//         data={data}
//         isModalOpen={isModalOpen}
//         closeItemModal={closeItemModal}
//       />
//     </>
//   );
// };

// export default ShopProductItemCard;
