/* auto-generated: mock /options for course */
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
      "name": "course_type",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Course Type"
      }
    },
    {
      "name": "school_id",
      "kind": "fk",
      "required": true,
      "ui": {
        "label": "School"
      },
      "ref": {
        "entity": "schools",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "session_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Session"
      },
      "ref": {
        "entity": "session",
        "valueKey": "id",
        "labelKey": "name"
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
      "name": "config",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Config"
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
      "name": "created_by",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Created By"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "name",
      "course_type",
      "session_id",
      "status",
      "publish_date",
      "is_active",
      "created_at"
    ]
  }
};
export async function options() { return optionsBase; }
