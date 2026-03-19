/* auto-generated: mock /options for price_group */
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
