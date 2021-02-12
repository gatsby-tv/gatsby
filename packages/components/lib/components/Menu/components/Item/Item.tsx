import React from "react";
import styled from "styled-components";

import { Connected } from "@lib/components/Connected";
import { Box, BoxProps } from "@lib/components/Box";

export type ItemProps = { children?: React.ReactNode } & BoxProps;

function ItemBase(props: ItemProps): React.ReactElement {
  const { children, ...rest } = props;

  return (
    <Connected.Item>
      <Box {...rest}>{children}</Box>
    </Connected.Item>
  );
}

export const Item = styled(ItemBase)``;
