/* auto-generated: mock /options for avendor */
export const optionsBase = {
  schema: [
    {
      name: "name",
      kind: "string",
      required: true,
      ui: {
        label: "Name",
      },
    },
    {
      name: "phone",
      kind: "string",
      required: false,
      ui: {
        label: "Phone",
      },
      validate: {
        regex: "^\\+?[0-9\\- ]{7,15}$",
        message: "Invalid phone",
      },
    },
  ],
  table: {
    columns: ["id", "name", "phone"],
    columnResolvers: {},
  },
};
export async function options() {
  return optionsBase;
}
