/* auto-generated: mock /options for item_tester */
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
      "name": "tester_type",
      "kind": "enum",
      "required": false,
      "ui": {
        "label": "Tester Type"
      },
      "options": [
        {
          "value": "sample",
          "label": "Sample"
        },
        {
          "value": "demo",
          "label": "Demo"
        },
        {
          "value": "return",
          "label": "Return"
        }
      ]
    },
    {
      "name": "quantity",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Quantity"
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
      "tester_type",
      "quantity",
      "created_at"
    ]
  }
};
export async function options() { return optionsBase; }
