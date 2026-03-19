/* auto-generated: mock /options for user_role_map */
export const optionsBase = {
  "schema": [
    {
      "name": "user_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "User"
      },
      "ref": {
        "entity": "user",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "role_type",
      "kind": "enum",
      "required": false,
      "ui": {
        "label": "Role Type"
      },
      "options": [
        {
          "value": "customer",
          "label": "Customer"
        },
        {
          "value": "vendor",
          "label": "Vendor"
        },
        {
          "value": "admin",
          "label": "Admin"
        }
      ]
    },
    {
      "name": "classification_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Classification"
      },
      "ref": {
        "entity": "classification",
        "valueKey": "id",
        "labelKey": "name"
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
      "role_type",
      "created_at"
    ]
  }
};
export async function options() { return optionsBase; }
