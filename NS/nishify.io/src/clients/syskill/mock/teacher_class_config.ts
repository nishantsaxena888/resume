/* auto-generated: mock /options for teacher_class_config */
export const optionsBase = {
  "schema": [
    {
      "name": "teacher_id",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Teacher"
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
      "name": "grade",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Grade"
      }
    },
    {
      "name": "session",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Session"
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
      "grade",
      "session",
      "created_at"
    ]
  }
};
export async function options() { return optionsBase; }
