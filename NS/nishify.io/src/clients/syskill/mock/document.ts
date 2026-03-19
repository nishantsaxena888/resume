/* auto-generated: mock /options for document */
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
      "name": "content",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Content"
      }
    },
    {
      "name": "is_active",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Is Active"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "name",
      "is_active"
    ]
  }
};
export async function options() { return optionsBase; }
