/* auto-generated: mock /options for user */
export const optionsBase = {
  "schema": [
    {
      "name": "email",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Email"
      },
      "validate": {
        "regex": "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$",
        "message": "invalid email"
      }
    },
    {
      "name": "name",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Name"
      }
    },
    {
      "name": "active",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Active"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "email",
      "name",
      "active"
    ]
  }
};
export async function options() { return optionsBase; }
