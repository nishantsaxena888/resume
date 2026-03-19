/* auto-generated: mock /options for task */
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
    },
    {
      "name": "total_cost",
      "kind": "number",
      "required": true,
      "ui": {
        "label": "Total Cost"
      }
    },
    {
      "name": "total_effort",
      "kind": "number",
      "required": true,
      "ui": {
        "label": "Total Effort"
      }
    },
    {
      "name": "total_effort",
      "kind": "number",
      "required": true,
      "ui": {
        "label": "Total Tasks"
      }
    },
    {
      "name": "project_type",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Project Type"
      }
    },
    {
      "name": "quality_level",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Quality Level"
      }
    },
    {
      "name": "project_requirment",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Project Requirment"
      }
    },
    {
      "name": "generated",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Generated"
      }
    },
    {
      "name": "total_tasks",
      "kind": "number",
      "required": true,
      "ui": {
        "label": "Total Tasks"
      }
    },
    {
      "name": "tasks",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Tasks"
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
