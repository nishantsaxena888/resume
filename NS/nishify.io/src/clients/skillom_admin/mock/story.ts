/* auto-generated: mock /options for story */
export const optionsBase = {
  "schema": [
    {
      "name": "title",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Title"
      }
    },
    {
      "name": "cover_image",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Cover Image"
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
      "title",
      "cover_image",
      "description",
      "is_active",
      "created_at"
    ]
  }
};
export async function options() { return optionsBase; }
