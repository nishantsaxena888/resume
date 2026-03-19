/* auto-generated: mock /options for user_group */
export const optionsBase = {
  "schema": [
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
      "name": "role",
      "kind": "enum",
      "required": false,
      "ui": {
        "label": "Role"
      },
      "options": [
        {
          "value": "vendor",
          "label": "Vendor"
        },
        {
          "value": "customer",
          "label": "Customer"
        },
        {
          "value": "admin",
          "label": "Admin"
        }
      ]
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
      "role",
      "created_at"
    ]
  }
};
export async function options() { return optionsBase; }
