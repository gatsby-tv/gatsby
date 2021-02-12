/* eslint-disable */

export const ifExists = (prop: any, value?: any) =>
  (Boolean(prop) || undefined) && (value ?? true);

export const ifNotExists = (prop: any, value?: any) =>
  (!Boolean(prop) || undefined) && (value ?? true);
