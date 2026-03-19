/* auto-generated: mock /options for item_category */
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
      "name": "description",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Description"
      }
    },
    {
      "name": "code",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Code"
      }
    },
    {
      "name": "type",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Type"
      }
    },
    {
      "name": "is_cigarette_category",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Cigarette Category"
      }
    },
    {
      "name": "is_electronics_cigarette",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Electronics Cigarette"
      }
    },
    {
      "name": "is_none_sales_category",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "None Sales Category"
      }
    },
    {
      "name": "is_beverage",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Beverage"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "name",
      "description",
      "code",
      "type",
      "is_cigarette_category",
      "is_electronics_cigarette",
      "is_none_sales_category",
      "is_beverage"
    ]
  }
};
export async function options() { return optionsBase; }
