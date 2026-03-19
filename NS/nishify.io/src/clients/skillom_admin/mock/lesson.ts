/* auto-generated: mock /options for lesson */
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
      "name": "image",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Image"
      }
    },
    {
      "name": "is_active",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Is Active"
      }
    },
    {
      "name": "created_at",
      "kind": "date",
      "required": false,
      "ui": {
        "label": "Created At"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "name",
      "is_active",
      "created_at"
    ]
  }
};
export async function options() { return optionsBase; }
