/* auto-generated: mock /options for address_type */
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
      "required": false,
      "ui": {
        "label": "Code"
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
      "code",
      "description"
    ]
  }
};
export async function options() { return optionsBase; }
