/* auto-generated: mock /options for user */
export const optionsBase = {
  "schema": [
    {
      "name": "id",
      "kind": "int",
      "required": false,
      "ui": {
        "label": "ID",
        "hidden": true,
        "disabled": true
      }
    },
    {
      "name": "name",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Name "
      }
    },
    {
      "name": "email",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Email "
      },
      "validate": {
        "regex": "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$",
        "message": "Invalid email"
      }
    },
    {
      "name": "username",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Username "
      }
    },
    {
      "name": "password",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Password ",
        "input": "password"
      },
      "validate": {
        "min": 6,
        "message": "Min 6 characters"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "name",
      "email",
      "username"
    ]
  }
};
export async function options() { return optionsBase; }
