/* auto-generated: mock /options for game_item */
export const optionsBase = {
  "schema": [
    {
      "name": "game_id",
      "kind": "fk",
      "required": true,
      "ui": {
        "label": "Game"
      },
      "ref": {
        "entity": "game",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "label",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Label"
      }
    },
    {
      "name": "group_name",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Group Name"
      }
    },
    {
      "name": "icon",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Icon"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "label",
      "group_name",
      "icon"
    ]
  }
};
export async function options() { return optionsBase; }
