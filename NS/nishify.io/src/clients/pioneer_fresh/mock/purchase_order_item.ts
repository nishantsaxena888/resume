/* auto-generated: mock /options for purchase_order_item */
export const optionsBase = {
  "schema": [
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
      "name": "purchase_order_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Purchase Order"
      },
      "ref": {
        "entity": "purchase_order",
        "valueKey": "id",
        "labelKey": "purchase_order_id"
      }
    },
    {
      "name": "quantity",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Quantity"
      }
    },
    {
      "name": "unit_price",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Unit Price"
      }
    },
    {
      "name": "tax_percent",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Tax Percent"
      }
    },
    {
      "name": "total_price",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Total Price"
      }
    }
  ],
  "table": {
    "columns": [
      "item_id",
      "purchase_order_id",
      "quantity",
      "unit_price",
      "tax_percent",
      "total_price"
    ],
    "columnResolvers": {}
  }
};
export async function options() { return optionsBase; }
