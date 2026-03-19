/* auto-generated: mock /options for entity_permission */
export const optionsBase = {
  "schema": [
    {
      "name": "group_id",
      "kind": "fk",
      "required": true,
      "ui": {
        "label": "Group"
      },
      "ref": {
        "entity": "grouping",
        "valueKey": "id",
        "labelKey": "name"
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
      "name": "entity",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Entity"
      }
    },
    {
      "name": "can_create",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Can Create"
      }
    },
    {
      "name": "can_read",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Can Read"
      }
    },
    {
      "name": "can_update",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Can Update"
      }
    },
    {
      "name": "can_delete",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Can Delete"
      }
    },
    {
      "name": "custom_rules",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Custom Rules"
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
      "entity",
      "can_create",
      "can_read",
      "can_update",
      "can_delete"
    ]
  }
};
export async function options() { return optionsBase; }
