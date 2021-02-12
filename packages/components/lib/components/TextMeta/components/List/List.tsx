import React from "react";
import styled from "styled-components";
import { ifExists } from "@gatsby-tv/utilities";

import { cssTextSubdued } from "@lib/styles/typography";
import { cssProperty } from "@lib/styles/property";
import { Flex } from "@lib/components/Flex";

import { Item, ItemProps } from "../Item";

export type ListProps = ItemProps;

const ListBase = styled(Flex)<ListProps>`
  & > ${Item} {
    ${(props) => ifExists(props.subdued, cssTextSubdued)}
    ${(props) => cssProperty("font-size", props.font)}
    ${(props) => cssProperty("font-weight", ifExists(props.bold, 600))}
  }

  & > ${Item}:not(:last-child):after {
    content: "•";
    margin: 0 ${(props) => props.theme.spacing[0.5]};
  }
`;

export const List: React.FC<ListProps> = (props: ListProps) => (
  <ListBase as="span" align="center" {...props} />
);
