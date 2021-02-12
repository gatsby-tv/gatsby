import React from "react";

import { Item, ItemProps } from "../Item";

export interface DataProps extends ItemProps {
  children?: React.ReactNode;
  id?: string;
  value: number;
}

export function Data(props: DataProps): React.ReactElement {
  const { children, ...rest } = props;

  return (
    <Item as="data" {...rest}>
      {children}
    </Item>
  );
}
