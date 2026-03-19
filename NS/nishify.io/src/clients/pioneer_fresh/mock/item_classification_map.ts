/* auto-generated: mock /options for item_classification_map */
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
      "name": "classification_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Classification"
      },
      "ref": {
        "entity": "classification",
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
