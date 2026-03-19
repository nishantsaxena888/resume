/* auto-generated: mock /options for widgets */
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
      "name": "content",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Content"
      }
    },
    {
      "name": "type",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Type"
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
      "name": "status",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Status"
      }
    },
    {
      "name": "publish_date",
      "kind": "date",
      "required": false,
      "ui": {
        "label": "Publish Date"
      }
    },
    {
      "name": "points",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Points"
      }
    },
    {
      "name": "created_by",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Created By"
      }
    },
    {
      "name": "updated_by",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Updated By"
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
    },
    {
      "name": "updated_at",
      "kind": "date",
      "required": false,
      "ui": {
        "label": "Updated At"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "name",
      "status",
      "description",
      "content",
      "type"
    ]
  }
};
export async function options() { return optionsBase; }
