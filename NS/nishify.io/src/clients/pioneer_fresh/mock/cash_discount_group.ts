/* auto-generated: mock /options for cash_discount_group */
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
      "name": "discount_percent",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Discount Percent"
      }
    },
    {
      "name": "description",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Description"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "name",
      "discount_percent",
      "description"
    ]
  }
};
export async function options() { return optionsBase; }
