/* auto-generated: mock /options for game_question */
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
      "name": "question",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Question"
      }
    },
    {
      "name": "image",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Image"
      }
    },
    {
      "name": "question_order",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Question Order"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "question",
      "image",
      "question_order"
    ]
  }
};
export async function options() { return optionsBase; }
