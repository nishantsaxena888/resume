/* auto-generated: mock /options for vendor_user_map */
export const optionsBase = {
  "schema": [
    {
      "name": "vendor_id",
      "kind": "fk",
      "required": true,
      "ui": {
        "label": "Vendor"
      },
      "ref": {
        "entity": "vendor",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
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
          "value": "owner",
          "label": "Owner"
        },
        {
          "value": "manager",
          "label": "Manager"
        },
        {
          "value": "staff",
          "label": "Staff"
        }
      ]
    },
    {
      "name": "status",
      "kind": "enum",
      "required": false,
      "ui": {
        "label": "Status"
      },
      "options": [
        {
          "value": "active",
          "label": "Active"
        },
        {
          "value": "inactive",
          "label": "Inactive"
        }
      ]
    }
  ],
  "table": {
    "columns": [
      "id",
      "vendor",
      "user",
      "role",
      "status"
    ]
  }
};
export async function options() { return optionsBase; }
