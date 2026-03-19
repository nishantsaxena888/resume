/* auto-generated: mock /options for product */
export const optionsBase = {
  "schema": [
    {
      "name": "name",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Product Name"
      }
    },
    {
      "name": "price",
      "kind": "number",
      "required": true,
      "ui": {
        "label": "Price"
      },
      "validate": {
        "min": 0
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
      "name": "active",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Active"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "name",
      "price",
      "active",
      "vendor_id"
    ]
  }
};
export async function options() { return optionsBase; }
