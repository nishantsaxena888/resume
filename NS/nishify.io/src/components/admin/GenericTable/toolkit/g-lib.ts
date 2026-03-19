export const headerLabel = (c: any) => String(c).replace(/_/g, " ");
export const sortIndicator = (ctl: any, key: string) =>
  ctl.isSortedAsc(key) ? " ▲" : ctl.isSortedDesc(key) ? " ▼" : "";
