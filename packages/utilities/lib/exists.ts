/* eslint-disable */

export const Exists = (prop: any, value?: any) =>
  (Boolean(prop) || undefined) && (value ?? true);

export const NotExists = (prop: any, value?: any) =>
  (!Boolean(prop) || undefined) && (value ?? true);
