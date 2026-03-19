/* auto-generated: mock /options for purchase_order */
export const optionsBase = {
  "schema": [
    {
      "name": "item_ids",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Item",
        "input": "multi_select_table",
        "label_hidden": true,
        "id_key": "purchase_order_id"
      },
      "ref": {
        "entity": "purchase_order_item"
      },
      "className": "md:col-span-12"
    },
    {
      "name": "vendor_classification_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Vendor Classification"
      },
      "ref": {
        "entity": "classification",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "created_by_user_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Created By User"
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
          "value": "submitted",
          "label": "Submitted"
        }
      ]
    },
    {
      "name": "order_date",
      "kind": "date",
      "required": false,
      "ui": {
        "label": "Order Date"
      }
    },
    {
      "name": "expected_date",
      "kind": "date",
      "required": false,
      "ui": {
        "label": "Expected Date"
      }
    },
    {
      "name": "currency",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Currency"
      }
    }
  ],
  "table": {
    "columns": [
      "vendor_classification_id",
      "status",
      "order_date",
      "expected_date",
      "currency"
    ],
    "columnResolvers": {
      "item": "name",
      "invoice": "invoice_no"
    }
  }
};
export async function options() { return optionsBase; }
