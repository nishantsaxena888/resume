/* auto-generated: mock /options for pricing */
export const optionsBase = {
  "schema": [
    {
      "name": "id",
      "kind": "int",
      "ui": {
        "label": "ID"
      }
    },
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
      "name": "price",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Price"
      },
      "validate": {
        "min": 0
      }
    },
    {
      "name": "start_date",
      "kind": "date",
      "required": false,
      "ui": {
        "label": "Start Date"
      }
    },
    {
      "name": "end_date",
      "kind": "date",
      "required": false,
      "ui": {
        "label": "End Date"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "price",
      "start_date",
      "end_date",
      "state",
      "item"
    ],
    "columnResolvers": {
      "item": "name",
      "state": "name"
    }
  }
};
export async function options() { return optionsBase; }
