/* auto-generated: mock /options for flip_book_page */
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
      "name": "is_editable",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Is Editable"
      }
    },
    {
      "name": "cover_page",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Cover Page"
      }
    },
    {
      "name": "end_page",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "End Page"
      }
    },
    {
      "name": "book",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Book"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "name",
      "is_editable",
      "cover_page",
      "end_page",
      "book"
    ]
  }
};
export async function options() { return optionsBase; }
