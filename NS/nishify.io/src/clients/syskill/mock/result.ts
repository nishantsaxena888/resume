/* auto-generated: mock /options for result */
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
      "name": "user_id",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "User"
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
      "name": "course_id",
      "kind": "fk",
      "required": true,
      "ui": {
        "label": "Course"
      },
      "ref": {
        "entity": "course",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "widget_result",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Widget Result"
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
      "status",
      "widget_result",
      "created_at"
    ]
  }
};
export async function options() { return optionsBase; }
