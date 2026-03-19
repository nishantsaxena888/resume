/* auto-generated: mock /options for secondary_category_map */
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
      "name": "secondary_category_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Secondary Category"
      },
      "ref": {
        "entity": "secondary_category",
        "valueKey": "id",
        "labelKey": "name"
      }
    }
  ],
  "table": {
    "columns": [
      "item",
      "secondary_category"
    ],
    "columnResolvers": {
      "item": "name",
      "secondary_category": "name"
    }
  }
};
export async function options() { return optionsBase; }
