/* auto-generated: mock /options for vendor */
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
      "name": "email",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Email"
      }
    },
    {
      "name": "phone",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Phone"
      }
    },
    {
      "name": "address",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Address"
      }
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
      "name",
      "email",
      "phone",
      "status"
    ]
  }
};
export async function options() { return optionsBase; }
