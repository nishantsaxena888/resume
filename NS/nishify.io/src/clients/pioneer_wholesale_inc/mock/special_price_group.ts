/* auto-generated: mock /options for special_price_group */
export const optionsBase = {
  "schema": [
    {
      "name": "name",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Name"
      }
    },
    {
      "name": "description",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Description"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "name",
      "description"
    ]
  }
};
export async function options() { return optionsBase; }
