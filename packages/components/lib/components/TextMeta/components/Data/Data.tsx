import React from "react";

import { Item, ItemProps } from "../Item";

export type DataProps = Omit<ItemProps, "element" | "dateTime">;

export function Data(props: DataProps): React.ReactElement {
  const { children, ...rest } = props;

  return (
    <Item element="data" {...rest}>
      {children}
    </Item>
  );
}
