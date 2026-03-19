/* auto-generated: mock /options for invoice_item_map */
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
        "entity": "sales_invoice",
        "valueKey": "id",
        "labelKey": "name"
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
      "name": "line_total",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Line Total"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "quantity",
      "unit_price",
      "tax_percent",
      "line_total"
    ]
  }
};
export async function options() { return optionsBase; }
