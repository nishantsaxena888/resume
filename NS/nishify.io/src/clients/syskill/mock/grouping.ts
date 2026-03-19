/* auto-generated: mock /options for grouping */
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
      "name": "school_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "School"
      },
      "ref": {
        "entity": "schools",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "parent_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Parent"
      },
      "ref": {
        "entity": "grouping",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "is_active",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Is Active"
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
      "name",
      "is_active",
      "created_at"
    ]
  }
};
export async function options() { return optionsBase; }
