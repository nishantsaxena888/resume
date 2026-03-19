/* auto-generated: mock /options for classification_type */
export const optionsBase = {
  "schema": [
    {
      "name": "code",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Code"
      }
    },
    {
      "name": "name",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Name"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "name",
      "code"
    ]
  }
};
export async function options() { return optionsBase; }
