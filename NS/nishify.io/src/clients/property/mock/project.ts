/* auto-generated: mock /options for project */
export const optionsBase = {
  "schema": [
    {
      "name": "project_context",
      "kind": "string",
      "ui": {
        "input": "heading",
        "label": "Step 1: Project Context",
        "placeholder": "Provide specific requirements, preferences, or constraints to help AI generate more accurate estimates",
        "columnClassName": "mb-4 col-span-full",
        "input_class": "text-muted-foreground text-[15px]",
        "label_class": "text-[16px]",
        "none_input": true,
        "group": "group-1"
      }
    },
    {
      "name": "name",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Project Name",
        "placeholder": "Enter project name (e.g., Downtown Office Renovation, Luxury Villa Interior)",
        "columnClassName": "mb-4 col-span-full",
        "input_class": "w-full !p-3 !h-auto border border-input rounded-md bg-input-background !text-[15px] leading-[25px] mt-1",
        "label_class": "mb-0",
        "helper_text": "This name will be used across all pages and reports.",
        "group": "group-1"
      }
    },
    {
      "name": "project_requirements",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Project Requirements & Context",
        "input": "textarea",
        "placeholder": "Describe any specific requirements, budget constraints, timeline preferences, material preferences, quality standards, or special considerations for this project. For example: 'High-end finishes preferred, budget around AED 37k, must complete within 4 weeks, eco-friendly materials only.'",
        "columnClassName": "mb-3 col-span-full",
        "input_class": "w-full !min-h-[120px] p-3 border border-input rounded-md bg-input-background resize-y !text-[15px] leading-[25px] mt-1",
        "label_class": "mb-0",
        "helper_text": "💡 More context helps the AI provide more accurate and tailored estimates",
        "group": "group-1"
      }
    },
    {
      "name": "project_type",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Project Type",
        "placeholder": "Select project type",
        "columnClassName": "mb-3 col-span-6",
        "input_class": "w-full !h-auto p-3 border border-input rounded-md !bg-input-background resize-y !text-[15px] leading-[25px] mt-1",
        "label_class": "mb-0",
        "group": "group-1"
      },
      "options": [
        {
          "label": "Residential",
          "value": "Residential"
        },
        {
          "label": "Commercial",
          "value": "Commercial"
        },
        {
          "label": "Hospitality",
          "value": "Hospitality"
        },
        {
          "label": "Retail",
          "value": "Retail"
        },
        {
          "label": "Office Space",
          "value": "Office Space"
        },
        {
          "label": "Other",
          "value": "Other"
        }
      ]
    },
    {
      "name": "quality_level",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Quality Level",
        "placeholder": "Select quality level",
        "columnClassName": "mb-3 col-span-6",
        "input_class": "w-full !h-auto p-3 border border-input rounded-md !bg-input-background resize-y !text-[15px] leading-[25px] mt-1",
        "label_class": "mb-0",
        "group": "group-1"
      },
      "options": [
        {
          "label": "Budget-friendly",
          "value": "Budget-friendly"
        },
        {
          "label": "Standard",
          "value": "Standard"
        },
        {
          "label": "Premium",
          "value": "Premium"
        },
        {
          "label": "Luxury",
          "value": "Luxury"
        }
      ]
    },
    {
      "name": "upload_design",
      "kind": "string",
      "ui": {
        "input": "heading",
        "label": "Step 2: Upload Design Files",
        "placeholder": "Supported formats: PDF, DWG, JPG, PNG, DOCX",
        "columnClassName": "mb-4 col-span-full",
        "input_class": "text-muted-foreground text-[15px]",
        "label_class": "text-[16px]",
        "none_input": true,
        "group": "group-2"
      }
    },
    {
      "name": "file_path",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Project Requirements & Context",
        "placeholder": "Describe any specific requirements, budget constraints, timeline preferences, material preferences, quality standards, or special considerations for this project. For example: 'High-end finishes preferred, budget around AED 37k, must complete within 4 weeks, eco-friendly materials only.'",
        "columnClassName": "mb-3 col-span-full",
        "input_class": "w-full !min-h-[120px] p-3 border border-input rounded-md bg-input-background resize-y !text-[15px] leading-[25px] mt-1",
        "label_class": "mb-0",
        "group": "group-2"
      }
    },
    {
      "name": "heading_3",
      "kind": "string",
      "ui": {
        "input": "heading",
        "label": "Ready for AI Analysis",
        "placeholder": "Your project context and file are ready. Click below to start the AI analysis.",
        "columnClassName": "mb-4 col-span-full",
        "input_class": "text-muted-foreground text-[15px]",
        "label_class": "text-[16px] leading-none flex items-center gap-2 ",
        "none_input": true,
        "group": "group-3",
        "label_tag": "div",
        "label_icon": "circle-check-big",
        "label_icon_class": "text-green-500"
      }
    },
    {
      "name": "heading_4",
      "kind": "string",
      "ui": {
        "input": "heading",
        "label": "AI Analysis Process",
        "placeholder": "Our AI will extract tasks, estimate costs, and identify required materials using both your context and design files. This typically takes 2-5 minutes depending on file complexity.",
        "columnClassName": "mb-4 col-span-full flex items-start gap-4 p-4 bg-muted/50 rounded-lg mb-3",
        "input_class": "text-muted-foreground text-[15px] pl-6",
        "label_class": "text-[16px] flex gap-2 items-center",
        "none_input": true,
        "group": "group-3",
        "label_tag": "div",
        "label_icon": "circle-alert",
        "label_icon_class": "text-blue-500"
      }
    },
    {
      "name": "login_button",
      "kind": "button",
      "ui": {
        "label": "Start AI Analysis",
        "columnClassName": "mb-3 col-span-full",
        "none_input": true,
        "label_hidden": true,
        "type": "submit",
        "input_class": "bg-black dark:bg-white !rounded-md w-full",
        "group": "group-3"
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
    },
    {
      "name": "created_at",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Created At"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "name"
    ],
    "form": {
      "className": "grid grid-cols-12 gap-3",
      "groupClassName": "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 px-6 shadow-sm mb-8 grid grid-cols-12 gap-3 col-span-12"
    }
  }
};
export async function options() { return optionsBase; }
