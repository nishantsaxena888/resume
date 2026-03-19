/* auto-generated: mock /options for invoice_item */
export const optionsBase = {
  "schema": [
    {
      "name": "invoice_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Invoice"
      },
      "ref": {
        "entity": "invoice",
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
      "invoice",
      "item"
    ],
    "columnResolvers": {
      "invoice": "id",
      "item": "name"
    }
  }
};
export async function options() { return optionsBase; }
