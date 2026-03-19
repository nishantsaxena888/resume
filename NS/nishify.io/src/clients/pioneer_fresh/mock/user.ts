/* auto-generated: mock /options for user */
export const optionsBase = {
  "schema": [
    {
      "name": "name",
      "kind": "string",
      "required": false,
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
      "name": "fax",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Fax"
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
      "name",
      "email",
      "phone",
      "fax",
      "address"
    ]
  }
};
export async function options() { return optionsBase; }
