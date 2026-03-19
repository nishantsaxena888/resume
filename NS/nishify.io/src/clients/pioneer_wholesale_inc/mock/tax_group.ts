/* auto-generated: mock /options for tax_group */
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
      "name": "tax_percent",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Tax Percent"
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
      "tax_percent"
    ]
  }
};
export async function options() { return optionsBase; }
