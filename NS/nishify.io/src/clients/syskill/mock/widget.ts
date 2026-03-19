/* auto-generated: mock /options for widget */
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
      "name": "details",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Details"
      }
    },
    {
      "name": "video",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Video"
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
      "required": true,
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
      "name": "config",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Config"
      }
    },
    {
      "name": "for_students",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "For Students"
      }
    },
    {
      "name": "for_teacher",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "For Teacher"
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
      "type",
      "details",
      "video",
      "config",
      "for_students",
      "for_teacher",
      "status",
      "publish_date",
      "points",
      "created_at"
    ]
  }
};
export async function options() { return optionsBase; }
