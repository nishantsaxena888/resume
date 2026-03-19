/* auto-generated: mock /options for order_item */
export const optionsBase = {
  "schema": [
    {
      "name": "order_id",
      "kind": "fk",
      "required": true,
      "ui": {
        "label": "Order"
      },
      "ref": {
        "entity": "order",
        "valueKey": "id",
        "labelKey": "id"
      }
    },
    {
      "name": "product_id",
      "kind": "fk",
      "required": true,
      "ui": {
        "label": "Product"
      },
      "ref": {
        "entity": "product",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "qty",
      "kind": "number",
      "required": true,
      "ui": {
        "label": "Qty"
      },
      "validate": {
        "min": 1
      }
    },
    {
      "name": "unit_price",
      "kind": "number",
      "required": true,
      "ui": {
        "label": "Unit Price"
      },
      "validate": {
        "min": 0
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "order_id",
      "product_id",
      "qty",
      "unit_price"
    ]
  }
};
export async function options() { return optionsBase; }
