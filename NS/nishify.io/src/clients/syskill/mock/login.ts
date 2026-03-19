/* auto-generated: mock /options for login */
export const optionsBase = {
  "schema": [
    {
      "name": "username",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Username",
        "columnClassName": "mb-4",
        "input_class": "!bg-[#f7f7f7] !px-[17px] !py-[8px] !rounded-[7px]",
        "label_class": "mb-0"
      }
    },
    {
      "name": "password",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Password ",
        "input": "password",
        "columnClassName": "mb-3",
        "input_class": "!bg-[#f7f7f7] !px-[17px] !py-[8px] !rounded-[7px]",
        "label_class": "mb-0"
      }
    },
    {
      "name": "login_button",
      "kind": "button",
      "ui": {
        "label": "Login",
        "columnClassName": "mb-3 w-full",
        "none_input": true,
        "label_hidden": true,
        "type": "submit",
        "input_class": "bg-black dark:bg-white !rounded-md w-full"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "name",
      "email",
      "username"
    ]
  }
};
export async function options() { return optionsBase; }
