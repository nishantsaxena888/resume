/* auto-generated: mock /options for item_tags_map */
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
      "name": "tags_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Tags"
      },
      "ref": {
        "entity": "tags",
        "valueKey": "id",
        "labelKey": "name"
      }
    }
  ],
  "table": {
    "columns": [
      "id"
    ]
  }
};
export async function options() { return optionsBase; }
