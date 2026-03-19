/* auto-generated: mock /options for state */
export const optionsBase = {
  "schema": [
    {
      "name": "name",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "State"
      },
      "validate": {
        "one_of": [
          "California",
          "Texas",
          "New York"
        ]
      },
      "options": [
        {
          "value": "California",
          "label": "California"
        },
        {
          "value": "Texas",
          "label": "Texas"
        },
        {
          "value": "New York",
          "label": "New York"
        }
      ]
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
