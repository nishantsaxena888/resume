/* auto-generated: mock /options for student_course_map */
export const optionsBase = {
  "schema": [
    {
      "name": "student_id",
      "kind": "fk",
      "required": true,
      "ui": {
        "label": "Student"
      },
      "ref": {
        "entity": "students",
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
    }
  ],
  "table": {
    "columns": [
      "id",
      "student_id",
      "course_id"
    ]
  }
};
export async function options() { return optionsBase; }
