/* auto-generated: mock /options for goods_inward */
export const optionsBase = {
  "schema": [
    {
      "name": "id",
      "kind": "int",
      "ui": {
        "label": "ID"
      }
    },
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
      "name": "date",
      "kind": "date",
      "required": false,
      "ui": {
        "label": "Date"
      }
    },
    {
      "name": "price",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Price"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "date",
      "price",
      "purchase_order",
      "item",
      "vendor"
    ],
    "columnResolvers": {
      "purchase_order": "id",
      "item": "name",
      "vendor": "name"
    }
  }
};
export async function options() { return optionsBase; }
