/* auto-generated: mock /options for category */
export const optionsBase = {
  "schema": [
    {
      "name": "id",
      "kind": "int",
      "required": false,
      "ui": {
        "label": "ID",
        "hidden": true,
        "disabled": true
      }
    },
    {
      "name": "name",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Name "
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "name"
    ]
  }
};
export async function options() { return optionsBase; }
