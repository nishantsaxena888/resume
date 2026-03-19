/* auto-generated: mock /options for purchase_order_item */
export const optionsBase = {
  "schema": [
    {
      "name": "purchase_order_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Purchase Order"
      },
      "ref": {
        "entity": "purchase_order",
        "valueKey": "id",
        "labelKey": "id"
      }
    },
    {
      "name": "item_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Item"
      },
      "ref": {
        "entity": "item",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "quantity",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Quantity"
      },
      "validate": {
        "min": 1
      }
    },
    {
      "name": "price",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Price"
      },
      "validate": {
        "min": 0
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "quantity",
      "price",
      "purchase_order",
      "item"
    ],
    "columnResolvers": {
      "purchase_order": "id",
      "item": "name"
    }
  }
};
export async function options() { return optionsBase; }
