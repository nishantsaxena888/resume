/* auto-generated: mock /options for ai_chat_history */
export const optionsBase = {
  "schema": [
    {
      "name": "user_id",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "User"
      }
    },
    {
      "name": "course_id",
      "kind": "fk",
      "required": true,
      "ui": {
        "label": "Course"
      },
      "ref": {
        "entity": "course",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "question",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Question"
      }
    },
    {
      "name": "answer",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Answer"
      }
    },
    {
      "name": "school_id",
      "kind": "fk",
      "required": true,
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
      "user_id",
      "course_id",
      "question",
      "created_at"
    ]
  }
};
export async function options() { return optionsBase; }
