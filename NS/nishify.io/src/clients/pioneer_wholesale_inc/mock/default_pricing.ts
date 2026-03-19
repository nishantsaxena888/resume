/* auto-generated: mock /options for default_pricing */
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
      "name": "price",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Price"
      },
      "validate": {
        "min": 0
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "item_id",
      "price"
    ],
    "columnResolvers": {
      "item": "name"
    }
  }
};
export async function options() { return optionsBase; }
