/* auto-generated: mock /options for tip_tap */
export const optionsBase = {
  "schema": [
    {
      "name": "title",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Title"
      }
    },
    {
      "name": "content",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Content"
      }
    },
    {
      "name": "created_by",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Created By"
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
      "title",
      "created_by",
      "created_at"
    ]
  }
};
export async function options() { return optionsBase; }
