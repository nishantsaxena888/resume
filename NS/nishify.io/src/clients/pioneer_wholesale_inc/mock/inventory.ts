/* auto-generated: mock /options for inventory */
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
      "name": "default_pricing_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Default Pricing"
      },
      "ref": {
        "entity": "pricing",
        "valueKey": "id",
        "labelKey": "id"
      }
    },
    {
      "name": "quantity",
      "kind": "number",
      "ui": {
        "label": "Quantity"
      },
      "validate": {
        "min": 0
      }
    },
    {
      "name": "order_qty",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Order Qty"
      },
      "validate": {
        "min": 0
      }
    },
    {
      "name": "goods_receipt_date",
      "kind": "date",
      "required": false,
      "ui": {
        "label": "Goods Receipt Date"
      }
    },
    {
      "name": "image",
      "kind": "image",
      "required": false,
      "ui": {
        "label": "Primary Image"
      }
    },
    {
      "name": "spec_sheet",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Spec Sheet"
      }
    },
    {
      "name": "compliance_cert",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Compliance Cert"
      }
    },
    {
      "name": "gallery",
      "kind": "image_gallery",
      "required": false,
      "ui": {
        "label": "Gallery (JSON list of paths)"
      }
    },
    {
      "name": "stock_qty",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Stock Qty"
      },
      "validate": {
        "min": 0
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "item",
      "default_pricing",
      "stock_qty",
      "order_qty",
      "goods_receipt_date",
      "image",
      "spec_sheet",
      "compliance_cert",
      "gallery"
    ],
    "columnResolvers": {
      "item": "name",
      "default_pricing": "id"
    }
  }
};
export async function options() { return optionsBase; }
