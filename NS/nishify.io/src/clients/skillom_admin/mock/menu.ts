/* auto-generated: mock /options for menu */
export const optionsBase = {
  "schema": [
    {
      "name": "title",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Title"
      }
    },
    {
      "name": "url",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Url"
      }
    },
    {
      "name": "icon",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Icon"
      }
    },
    {
      "name": "entity",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Entity"
      }
    },
    {
      "name": "is_dashboard",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Is Dashboard"
      }
    },
    {
      "name": "config",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Config"
      }
    },
    {
      "name": "menu_scope",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Menu Scope"
      }
    },
    {
      "name": "course_id",
      "kind": "fk",
      "required": false,
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
      "name": "widget_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Widget"
      },
      "ref": {
        "entity": "widget",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "parent_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Parent"
      },
      "ref": {
        "entity": "menu",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "order_no",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Order No"
      }
    },
    {
      "name": "is_active",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Is Active"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "title",
      "menu_scope",
      "url",
      "icon",
      "entity",
      "course_id",
      "widget_id",
      "config",
      "parent_id",
      "order_no"
    ]
  }
};
export async function options() { return optionsBase; }
