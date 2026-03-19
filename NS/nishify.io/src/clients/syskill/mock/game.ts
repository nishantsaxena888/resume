/* auto-generated: mock /options for game */
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
    },
    {
      "name": "types",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Types"
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
      "types",
      "is_active"
    ]
  }
};
export async function options() { return optionsBase; }
