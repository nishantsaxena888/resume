/* auto-generated: mock /options for secondary_category */
export const optionsBase = {
  "schema": [
    {
      "name": "name",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Name"
      }
    },
    {
      "name": "item_category_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Item Category"
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
      "id",
      "name"
    ]
  }
};
export async function options() { return optionsBase; }
