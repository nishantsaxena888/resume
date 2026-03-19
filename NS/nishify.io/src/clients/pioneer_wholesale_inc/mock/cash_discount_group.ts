/* auto-generated: mock /options for cash_discount_group */
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
      "name": "discount_percent",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Discount Percent"
      },
      "validate": {
        "min": 0
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "name",
      "discount_percent"
    ]
  }
};
export async function options() { return optionsBase; }
