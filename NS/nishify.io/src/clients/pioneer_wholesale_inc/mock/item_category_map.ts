/* auto-generated: mock /options for item_category_map */
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
      "name": "item_category_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Category"
      },
      "ref": {
        "entity": "item_category",
        "valueKey": "id",
        "labelKey": "name"
      }
    }
  ],
  "table": {
    "columns": [
      "item",
      "item_category"
    ],
    "columnResolvers": {
      "item": "name",
      "item_category": "name"
    }
  }
};
export async function options() { return optionsBase; }
