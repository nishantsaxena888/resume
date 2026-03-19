/* auto-generated: mock /options for user_course_activity */
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
      "name": "last_seen",
      "kind": "date",
      "required": true,
      "ui": {
        "label": "Last Seen"
      }
    },
    {
      "name": "progress",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Progress"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "last_seen",
      "progress"
    ]
  }
};
export async function options() { return optionsBase; }
