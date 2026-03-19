/* auto-generated: mock /options for invoice */
export const optionsBase = {
  "schema": [
    {
      "name": "customer_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Customer"
      },
      "ref": {
        "entity": "customer",
        "valueKey": "id",
        "labelKey": "name"
      }
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
      "name": "invoice_no",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Invoice #"
      }
    },
    {
      "name": "po_no",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "PO #"
      }
    },
    {
      "name": "customer_type",
      "kind": "enum",
      "required": false,
      "ui": {
        "label": "Customer Type"
      },
      "options": [
        {
          "value": "liquor",
          "label": "Liquor"
        },
        {
          "value": "commercial_customers",
          "label": "Commercial Customers"
        },
        {
          "value": "wholesalers_and_distributors",
          "label": "Wholesalers And Distributors"
        },
        {
          "value": "manufacturers",
          "label": "Manufacturers"
        },
        {
          "value": "retailers",
          "label": "Retailers"
        }
      ],
      "enum": [
        "liquor",
        "commercial_customers",
        "wholesalers_and_distributors",
        "manufacturers",
        "retailers"
      ]
    },
    {
      "name": "shipping_delivery_type",
      "kind": "enum",
      "required": false,
      "ui": {
        "label": "Shipping / Delivery"
      },
      "options": [
        {
          "value": "pickup",
          "label": "Pickup"
        },
        {
          "value": "delivery",
          "label": "Delivery"
        }
      ],
      "enum": [
        "pickup",
        "delivery"
      ]
    },
    {
      "name": "delivery_date",
      "kind": "date",
      "required": false,
      "ui": {
        "label": "Delivery Date"
      }
    },
    {
      "name": "billing_address",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Billing Address"
      }
    },
    {
      "name": "customer_notes",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Customer Notes"
      }
    },
    {
      "name": "total_amount",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Total Amount"
      },
      "validate": {
        "min": 0
      }
    },
    {
      "name": "item_ids",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Item",
        "input": "multi_select_table",
        "label_hidden": true,
        "id_key": "invoice_id"
      },
      "ref": {
        "entity": "item_invoice_map"
      },
      "className": "md:col-span-12"
    }
  ],
  "table": {
    "columns": [
      "id",
      "invoice_no",
      "po_no",
      "customer_id",
      "customer_type",
      "invoice_date",
      "shipping_delivery_type",
      "delivery_date",
      "total_amount"
    ]
  }
};
export async function options() { return optionsBase; }
