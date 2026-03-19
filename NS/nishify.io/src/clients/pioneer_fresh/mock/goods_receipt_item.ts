/* auto-generated: mock /options for goods_receipt_item */
export const optionsBase = {
  "schema": [
    {
      "name": "goods_receipt_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Goods Receipt"
      },
      "ref": {
        "entity": "goods_receipt",
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
      "name": "received_qty",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Received Qty"
      }
    },
    {
      "name": "accepted_qty",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Accepted Qty"
      }
    },
    {
      "name": "rejected_qty",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Rejected Qty"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "received_qty",
      "accepted_qty",
      "rejected_qty"
    ]
  }
};
export async function options() { return optionsBase; }
