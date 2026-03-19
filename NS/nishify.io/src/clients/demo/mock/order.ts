/* auto-generated: mock /options for order */
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
      "name": "status",
      "kind": "enum",
      "required": false,
      "ui": {
        "label": "Status"
      },
      "options": [
        {
          "value": "new",
          "label": "New"
        },
        {
          "value": "paid",
          "label": "Paid"
        },
        {
          "value": "shipped",
          "label": "Shipped"
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
      "user_id",
      "status",
      "created_at"
    ]
  }
};
export async function options() { return optionsBase; }
