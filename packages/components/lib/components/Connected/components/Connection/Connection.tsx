import React from "react";
import styled, { css } from "styled-components";

import { useConnected } from "@lib/utilities/connected";
import { Box, BoxProps } from "@lib/components/Box";

export type ConnectionProps = { className?: string } & BoxProps;

const ConnectionBase: React.FC<ConnectionProps> = (props) => {
  const column = useConnected();

  const style = css`
    flex: 0 0 auto;

    &:not(:first-child) {
      ${column ? "margin-top" : "margin-left"}: -1px;
    }
  `;

  return <Box css={style} {...props} />;
};

export const Connection = styled(ConnectionBase)``;
