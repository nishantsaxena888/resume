/* auto-generated: mock /options for purchase_order */
export const optionsBase = {
  "schema": [
    {
      "name": "vendor_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Vendor"
      },
      "ref": {
        "entity": "vendor",
        "valueKey": "id",
        "labelKey": "name"
      }
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
      "name": "status",
      "kind": "enum",
      "required": false,
      "ui": {
        "label": "Status"
      },
      "options": [
        {
          "value": "open",
          "label": "Open"
        },
        {
          "value": "closed",
          "label": "Closed"
        },
        {
          "value": "cancelled",
          "label": "Cancelled"
        }
      ]
    },
    {
      "name": "vendor_pi",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Vendor PI"
      }
    },
    {
      "name": "etd_date",
      "kind": "date",
      "required": false,
      "ui": {
        "label": "ETD Date"
      }
    },
    {
      "name": "eta",
      "kind": "date",
      "required": false,
      "ui": {
        "label": "ETA"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "eta",
      "etd_date",
      "order_date",
      "status",
      "vendor",
      "vendor_pi"
    ],
    "columnResolvers": {
      "vendor": "name"
    }
  }
};
export async function options() { return optionsBase; }
