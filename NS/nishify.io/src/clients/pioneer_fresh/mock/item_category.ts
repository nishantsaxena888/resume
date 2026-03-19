/* auto-generated: mock /options for item_category */
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
      "name": "parent_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Parent"
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
