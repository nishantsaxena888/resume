/* auto-generated: mock /options for users */
export const optionsBase = {
  "schema": [
    {
      "name": "username",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Username"
      }
    },
    {
      "name": "email",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Email"
      }
    },
    {
      "name": "password_hash",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Password Hash"
      }
    },
    {
      "name": "first_name",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "First Name"
      }
    },
    {
      "name": "last_name",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Last Name"
      }
    },
    {
      "name": "school_id",
      "kind": "fk",
      "required": false,
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
      "name": "role",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Role"
      }
    },
    {
      "name": "is_active",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Is Active"
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
      "username",
      "email",
      "password_hash",
      "first_name",
      "last_name"
    ]
  }
};
export async function options() { return optionsBase; }
