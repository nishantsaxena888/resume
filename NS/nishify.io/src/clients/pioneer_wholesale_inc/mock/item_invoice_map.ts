/* auto-generated: mock /options for item_invoice_map */
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
      "name": "invoice_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Invoice"
      },
      "ref": {
        "entity": "invoice",
        "valueKey": "id",
        "labelKey": "invoice_no"
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
        "label": "Unit Price"
      },
      "validate": {
        "min": 0
      }
    }
  ],
  "table": {
    "columns": [
      "item",
      "invoice",
      "quantity",
      "price"
    ],
    "columnResolvers": {
      "item": "name",
      "invoice": "invoice_no"
    }
  }
};
export async function options() { return optionsBase; }
