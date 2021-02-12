import React from "react";
import styled from "styled-components";
import { ifExists } from "@gatsby-tv/utilities";

import { useSelection } from "@lib/utilities/selection";
import { Flex } from "@lib/components/Flex";

export interface ItemProps {
  children?: React.ReactNode;
  id?: string;
  className?: string;
  option: string;
  ariaControls?: string;
}

const ItemBase: React.FC<ItemProps> = (props: ItemProps) => {
  const { children, id, option, className, ariaControls } = props;
  const { selection, onSelect } = useSelection();
  const handleClick = () => onSelect(option);

  const itemProps = {
    id,
    className,
    grow: 1,
    role: "tab",
    tabindex: selection[option] ? 0 : -1,
    "aria-selected": ifExists(selection[option]),
    "aria-controls": ariaControls,
    onClick: handleClick,
  };

  return <Flex.Item {...itemProps}>{children}</Flex.Item>;
};

export const Item = styled(ItemBase)<ItemProps>``;
