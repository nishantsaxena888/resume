/* auto-generated: mock /options for grade */
export const optionsBase = {
  "schema": [
    {
      "name": "user_id",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "User"
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
      "name": "widget_id",
      "kind": "fk",
      "required": true,
      "ui": {
        "label": "Widget"
      },
      "ref": {
        "entity": "widget",
        "valueKey": "id",
        "labelKey": "name"
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
      "name": "response",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Response"
      }
    },
    {
      "name": "score",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Score"
      }
    },
    {
      "name": "grade_label",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Grade Label"
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
      "status",
      "response",
      "score",
      "grade_label",
      "created_at"
    ]
  }
};
export async function options() { return optionsBase; }
