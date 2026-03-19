/* auto-generated: mock /options for colors */
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
      "name": "code",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Code"
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
