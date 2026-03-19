/* auto-generated: mock /options for invoice_basic */
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
      "name": "price",
      "kind": "number",
      "required": true,
      "ui": {
        "label": "Price"
      }
    },
    {
      "name": "qty",
      "kind": "number",
      "required": true,
      "ui": {
        "label": "Quantity"
      }
    },
    {
      "name": "qty_measure",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Quantity Measure"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "price",
      "qty",
      "qty_measure",
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
