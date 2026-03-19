/* auto-generated: mock /options for course_history */
export const optionsBase = {
  "schema": [
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
      "name": "user_id",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "User"
      }
    },
    {
      "name": "operation_type",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Operation Type"
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
      "operation_type",
      "updated_by",
      "updated_at"
    ]
  }
};
export async function options() { return optionsBase; }
