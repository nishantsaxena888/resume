/* auto-generated: mock /options for group_user_map */
export const optionsBase = {
  "schema": [
    {
      "name": "group_id",
      "kind": "fk",
      "required": true,
      "ui": {
        "label": "Group"
      },
      "ref": {
        "entity": "grouping",
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
      "created_at"
    ]
  }
};
export async function options() { return optionsBase; }
