/* auto-generated: mock /options for inventory_ledger */
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
      "name": "movement_type",
      "kind": "enum",
      "required": false,
      "ui": {
        "label": "Movement Type"
      },
      "options": [
        {
          "value": "po_receipt",
          "label": "Po Receipt"
        },
        {
          "value": "sale_shipment",
          "label": "Sale Shipment"
        },
        {
          "value": "adjustment_in",
          "label": "Adjustment In"
        },
        {
          "value": "adjustment_out",
          "label": "Adjustment Out"
        }
      ]
    },
    {
      "name": "reference_table",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Reference Table"
      }
    },
    {
      "name": "reference_ref",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Reference Ref"
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
      "name": "transaction_date",
      "kind": "date",
      "required": false,
      "ui": {
        "label": "Transaction Date"
      }
    },
    {
      "name": "created_at",
      "kind": "date",
      "required": false,
      "ui": {
        "label": "Created At"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "movement_type",
      "reference_table",
      "reference_ref",
      "quantity",
      "transaction_date"
    ]
  }
};
export async function options() { return optionsBase; }
