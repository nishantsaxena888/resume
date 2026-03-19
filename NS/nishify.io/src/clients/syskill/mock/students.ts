/* auto-generated: mock /options for students */
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
      "name": "address",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Address"
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
      "name": "final_score",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Final Score"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "name",
      "address",
      "final_score"
    ]
  }
};
export async function options() { return optionsBase; }
