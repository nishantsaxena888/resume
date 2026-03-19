// import { max } from "date-fns";

/* auto-generated: mock /options for inventory */
export const optionsBase = {
  schema: [
    {
      name: "item_id",
      kind: "fk",
      required: false,
      ui: {
        label: "Category",
        max: 5,
        type: "multi_select_checkbox",
        isMultiSelectCheck: true,
        heading_class: "text-[#3d4750] text-[18px]",
        labelClassName:
          "block !text-[#777] dark:text-[#fff] text-sm leading-5 font-normal capitalize cursor-pointer ml-[10px] mt-0",
        columnClassName: "bb-sidebar-block",
      },
      ref: {
        entity: "item",
        valueKey: "id",
        labelKey: "name",
      },
    },
    {
      name: "weight",
      kind: "options",
      required: false,
      ui: {
        label: "Weight",
        isMultiSelectCheck: true,
        max: 4,
        type: "multi_select_checkbox",
        heading_class: "text-[#3d4750] text-[18px]",
        labelClassName:
          "block text-[#777] dark:text-[#fff] text-sm leading-5 font-normal capitalize cursor-pointer ml-[10px] mt-0",
        columnClassName: "bb-sidebar-block",
      },
      options: [
        { value: "1", label: "500g" },
        { value: "2", label: "100ml" },
        { value: "3", label: "100g" },
        { value: "4", label: "1pack" },
        { value: "5", label: "200g" },
        { value: "6", label: "250g" },
        { value: "7", label: "2Pcs" },
        { value: "8", label: "12Pcs" },
        { value: "9", label: "2kg" },
        { value: "10", label: "20kg" },
        { value: "11", label: "10kg" },
        { value: "12", label: "5kg" },
        { value: "13", label: "2pcs" },
        { value: "14", label: "6pcs" },
      ],
    },
    {
      name: "color",
      kind: "options",
      required: false,
      ui: {
        label: "Color",
        isMultiSelectCheck: true,
        type: "multi_select_color",
        heading_class: "text-[#3d4750] text-[18px]",
        labelClassName:
          "block text-[#777] dark:text-[#fff] text-sm leading-5 font-normal capitalize cursor-pointer ml-[10px] mt-0",
        columnClassName: "bb-sidebar-block",
      },
      options: [
        { value: "powder-blue", label: "Powder Blue", color: "#cfe9ff" },
        { value: "rose", label: "Rose", color: "#ff8fa3" },
        { value: "black", label: "Black", color: "#000000" },
        { value: "green", label: "Green", color: "#22c55e" },
        { value: "coral", label: "Coral", color: "#fb6a4a" },
        { value: "magenta", label: "Magenta", color: "#ea5aff" },
        { value: "yellow", label: "Yellow", color: "#fde047" },
        { value: "lavender", label: "Lavender", color: "#c4b5fd" },
        { value: "cyan", label: "Cyan", color: "#99f6e4" },
        { value: "teal", label: "Teal", color: "#34d399" },
      ],
    },
    {
      name: "price_range",
      kind: "price_range",
      required: false,
      ui: {
        label: "Color",
        min: 0,
        max: 500,
        step: 1,
        default_value: [100, 450],
        currency: "$",
        heading_class: "text-[#3d4750] text-[18px]",
        columnClassName: "bb-sidebar-block",
      },
    },
    {
      name: "tags",
      kind: "options",
      required: false,
      ui: {
        label: "Tags",
        isMultiSelectCheck: true,
        type: "multi_select_chip",
        heading_class: "text-[#3d4750] text-[18px]",
        labelClassName:
          "block text-[#777] dark:text-[#fff] text-sm leading-5 font-normal capitalize cursor-pointer ml-[10px] mt-0",
        columnClassName: "bb-sidebar-block",
      },
      options: [
        { value: "snacks", label: "Snacks" },
        { value: "juice", label: "Juice" },
        { value: "chips", label: "Chips" },
        { value: "trend", label: "Trend" },
        { value: "spices", label: "Spices" },
        { value: "cardamom", label: "Cardamom" },
        { value: "chilli", label: "Chilli" },
        { value: "sauces", label: "Sauces" },
        { value: "fruit", label: "Fruit" },
        { value: "berry", label: "Berry" },
        { value: "cherry", label: "Cherry" },
        { value: "orange", label: "Orange" },
        { value: "guava", label: "Guava" },
        { value: "mango", label: "Mango" },
        { value: "banana", label: "Banana" },
        { value: "potato", label: "Potato" },
        { value: "onion", label: "Onion" },
        { value: "leaves", label: "Leaves" },
      ],
    },
  ],
  table: {
    columns: ["id", "item_id", "location_id", "quantity", "last_stock_date"],
    columnResolvers: {},
  },
};
export async function options() {
  return optionsBase;
}
