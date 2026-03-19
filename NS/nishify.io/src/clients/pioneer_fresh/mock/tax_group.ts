/* auto-generated: mock /options for tax_group */
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
      "name": "tax_percent",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Tax Percent"
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
      "tax_percent",
      "description"
    ]
  }
};
export async function options() { return optionsBase; }
