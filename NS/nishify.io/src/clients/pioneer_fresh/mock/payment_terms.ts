/* auto-generated: mock /options for payment_terms */
export const optionsBase = {
  "schema": [
    {
      "name": "name",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Name"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "name"
    ]
  }
};
export async function options() { return optionsBase; }
