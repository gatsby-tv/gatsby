import React from "react";
import styled from "styled-components";
import { ifExists } from "@gatsby-tv/utilities";

import { useSwitch } from "@lib/utilities/switch";
import { Flex } from "@lib/components/Flex";

export interface ItemProps {
  children?: React.ReactNode;
  id: string;
  className?: string;
}

const ItemBase: React.FC<ItemProps> = (props: ItemProps) => {
  const { children, id, className } = props;
  const { selection, onSelect } = useSwitch();
  const handleClick = () => onSelect(props.id);

  const flexProps = {
    className,
    "data-selected": ifExists(selection[id]),
    grow: 1,
    onClick: handleClick,
  };

  return (
    <Flex.Item {...flexProps}>
      <Flex center>{children}</Flex>
    </Flex.Item>
  );
};

export const Item = styled(ItemBase)``;
