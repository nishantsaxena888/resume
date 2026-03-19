/* auto-generated: mock /options for brand */
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
      "name": "description",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Description"
      }
    },
    {
      "name": "image",
      "kind": "image",
      "required": false,
      "ui": {
        "label": "Primary Image",
        "input": "image"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "name",
      "description"
    ]
  }
};
export async function options() { return optionsBase; }
