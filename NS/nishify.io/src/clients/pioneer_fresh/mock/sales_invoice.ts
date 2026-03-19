/* auto-generated: mock /options for sales_invoice */
export const optionsBase = {
  "schema": [
    {
      "name": "customer_classification_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Customer Classification"
      },
      "ref": {
        "entity": "classification",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "billed_to_user_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Billed To User"
      },
      "ref": {
        "entity": "user",
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
          "value": "draft",
          "label": "Draft"
        },
        {
          "value": "approved",
          "label": "Approved"
        },
        {
          "value": "posted",
          "label": "Posted"
        }
      ]
    },
    {
      "name": "invoice_date",
      "kind": "date",
      "required": false,
      "ui": {
        "label": "Invoice Date"
      }
    },
    {
      "name": "currency",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Currency"
      }
    },
    {
      "name": "total_amount",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Total Amount"
      }
    },
    {
      "name": "posted_at",
      "kind": "date",
      "required": false,
      "ui": {
        "label": "Posted At"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "status",
      "invoice_date",
      "currency",
      "total_amount",
      "posted_at"
    ]
  }
};
export async function options() { return optionsBase; }
