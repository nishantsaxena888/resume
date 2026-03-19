/* auto-generated: mock /options for session */
export const optionsBase = {
  "schema": [
    {
      "name": "classroom_id",
      "kind": "fk",
      "required": true,
      "ui": {
        "label": "Classroom"
      },
      "ref": {
        "entity": "classroom",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "name",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Name"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "name"
    ]
  }
};
export async function options() { return optionsBase; }
