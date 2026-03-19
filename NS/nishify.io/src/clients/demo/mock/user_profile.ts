/* auto-generated: mock /options for user_profile */
export const optionsBase = {
  "schema": [
    {
      "name": "user_id",
      "kind": "fk",
      "required": true,
      "ui": {
        "label": "User"
      },
      "ref": {
        "entity": "user",
        "valueKey": "id",
        "labelKey": "email"
      }
    },
    {
      "name": "bio",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Bio"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "user_id",
      "bio"
    ]
  }
};
export async function options() { return optionsBase; }
