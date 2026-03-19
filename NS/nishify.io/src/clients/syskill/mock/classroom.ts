/* auto-generated: mock /options for classroom */
export const optionsBase = {
  "schema": [
    {
      "name": "batch_id",
      "kind": "fk",
      "required": true,
      "ui": {
        "label": "Batch"
      },
      "ref": {
        "entity": "batch",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "name",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Name"
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
