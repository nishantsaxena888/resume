/* auto-generated: mock /options for address */
export const optionsBase = {
  "schema": [
    {
      "name": "line1",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Address Line 1"
      }
    },
    {
      "name": "line2",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Address Line 2"
      }
    },
    {
      "name": "city",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "City"
      }
    },
    {
      "name": "state_code",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "State Code"
      }
    },
    {
      "name": "postal_code",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Postal Code"
      }
    },
    {
      "name": "country_code",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Country Code"
      }
    },
    {
      "name": "is_primary",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Is Primary"
      }
    },
    {
      "name": "classification_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Classification"
      },
      "ref": {
        "entity": "classification",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "address_type_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Address Type"
      },
      "ref": {
        "entity": "address_type",
        "valueKey": "id",
        "labelKey": "name"
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
      "line1",
      "line2",
      "city",
      "state_code",
      "postal_code",
      "country_code",
      "is_primary"
    ]
  }
};
export async function options() { return optionsBase; }
