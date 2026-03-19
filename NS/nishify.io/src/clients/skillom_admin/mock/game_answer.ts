/* auto-generated: mock /options for game_answer */
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
      "name": "answer_data",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Answer Data"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "answer_data"
    ]
  }
};
export async function options() { return optionsBase; }
