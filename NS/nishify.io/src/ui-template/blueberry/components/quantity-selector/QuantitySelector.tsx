"use client";
// import { updateQuantity } from "@/store/reducer/cartSlice";
// import { useDispatch } from "react-redux";

const QuantitySelector = ({
  increment,
  decrement,
  quantity,
}: {
  quantity: number;
  increment?: any;
  decrement?: any;
}) => {
  // const dispatch = useDispatch();

  const handleQuantityChange = (operation: "increase" | "decrease") => {
    if (operation === "increase") {
      increment();
    } else if (operation === "decrease" && quantity > 1) {
      decrement();
    }
  };

  return (
    <>
      <div
        className="bb-qtybtn"
        onClick={() => handleQuantityChange("decrease")}
      >
        -
      </div>
      <input
        readOnly
        className="qty-input location-select"
        type="text"
        name="gi-qtybtn"
        value={quantity}
      />
      <div
        className="bb-qtybtn"
        onClick={() => handleQuantityChange("increase")}
      >
        +
      </div>
    </>
  );
};

export default QuantitySelector;
