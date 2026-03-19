/* auto-generated: mock /options for goods_receipt */
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
        "labelKey": "name"
      }
    },
    {
      "name": "status",
      "kind": "enum",
      "required": false,
      "ui": {
        "label": "Status"
      },
      "options": [
        {
          "value": "pending",
          "label": "Pending"
        },
        {
          "value": "received",
          "label": "Received"
        },
        {
          "value": "cancelled",
          "label": "Cancelled"
        }
      ]
    },
    {
      "name": "received_date",
      "kind": "date",
      "required": false,
      "ui": {
        "label": "Received Date"
      }
    },
    {
      "name": "notes",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Notes"
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
      "status",
      "received_date",
      "notes",
      "created_at"
    ]
  }
};
export async function options() { return optionsBase; }
