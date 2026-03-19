/* auto-generated: mock /options for product_tag */
export const optionsBase = {
  "schema": [
    {
      "name": "product_id",
      "kind": "fk",
      "required": true,
      "ui": {
        "label": "Product"
      },
      "ref": {
        "entity": "product",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "tag_id",
      "kind": "fk",
      "required": true,
      "ui": {
        "label": "Tag"
      },
      "ref": {
        "entity": "tag",
        "valueKey": "id",
        "labelKey": "name"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "product_id",
      "tag_id"
    ]
  }
};
export async function options() { return optionsBase; }
