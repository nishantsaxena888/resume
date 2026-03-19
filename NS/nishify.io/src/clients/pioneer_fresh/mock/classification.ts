/* auto-generated: mock /options for classification */
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
      "name": "classification_type_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Classification Type"
      },
      "ref": {
        "entity": "classification_type",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "parent_classification_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Parent Classification"
      },
      "ref": {
        "entity": "classification",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "status",
      "kind": "enum",
      "required": false,
      "ui": {
        "label": "Status"
      },
      "options": [
        {
          "value": "active",
          "label": "Active"
        },
        {
          "value": "inactive",
          "label": "Inactive"
        }
      ]
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
      "name",
      "status",
      "effective_from",
      "currency",
      "notes"
    ]
  }
};
export async function options() { return optionsBase; }
