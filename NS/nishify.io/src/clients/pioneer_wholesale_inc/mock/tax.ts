/* auto-generated: mock /options for tax */
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
    },
    {
      "name": "state_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "State"
      },
      "ref": {
        "entity": "state",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "vendor_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Vendor"
      },
      "ref": {
        "entity": "vendor",
        "valueKey": "id",
        "labelKey": "name"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "name",
      "tax_percent",
      "vendor"
    ],
    "columnResolvers": {
      "vendor": "name"
    }
  }
};
export async function options() { return optionsBase; }
