/* auto-generated: mock /options for game_option */
export const optionsBase = {
  "schema": [
    {
      "name": "question_id",
      "kind": "fk",
      "required": true,
      "ui": {
        "label": "Question"
      },
      "ref": {
        "entity": "game_question",
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
      "name": "group",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Group"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "label",
      "group"
    ]
  }
};
export async function options() { return optionsBase; }
