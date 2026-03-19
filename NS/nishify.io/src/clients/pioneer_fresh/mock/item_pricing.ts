/* auto-generated: mock /options for item_pricing */
export const optionsBase = {
  "schema": [
    {
      "name": "item_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Item"
      },
      "ref": {
        "entity": "item",
        "valueKey": "id",
        "labelKey": "name"
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
      "name": "price_type",
      "kind": "enum",
      "required": false,
      "ui": {
        "label": "Price Type"
      },
      "options": [
        {
          "value": "list",
          "label": "List"
        },
        {
          "value": "special",
          "label": "Special"
        },
        {
          "value": "discount",
          "label": "Discount"
        }
      ]
    },
    {
      "name": "price",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Price"
      }
    },
    {
      "name": "effective_from",
      "kind": "date",
      "required": false,
      "ui": {
        "label": "Effective From"
      }
    },
    {
      "name": "effective_to",
      "kind": "date",
      "required": false,
      "ui": {
        "label": "Effective To"
      }
    },
    {
      "name": "currency",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Currency"
      }
    },
    {
      "name": "notes",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Notes"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "price",
      "price_type",
      "effective_from",
      "effective_to",
      "currency"
    ]
  }
};
export async function options() { return optionsBase; }
