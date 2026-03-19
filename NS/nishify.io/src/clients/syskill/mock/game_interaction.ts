/* auto-generated: mock /options for game_interaction */
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
      "name": "item_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Item"
      },
      "ref": {
        "entity": "game_item",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "x",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "X"
      }
    },
    {
      "name": "y",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Y"
      }
    },
    {
      "name": "radius",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Radius"
      }
    },
    {
      "name": "correct_answer",
      "kind": "enum",
      "required": false,
      "ui": {
        "label": "Correct Answer"
      },
      "options": [
        {
          "value": "Human",
          "label": "Human"
        },
        {
          "value": "Robot",
          "label": "Robot"
        }
      ]
    }
  ],
  "table": {
    "columns": [
      "id",
      "x",
      "y",
      "radius",
      "correct_answer"
    ]
  }
};
export async function options() { return optionsBase; }
