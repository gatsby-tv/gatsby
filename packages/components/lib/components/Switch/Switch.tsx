import React from "react";
import { css } from "styled-components";

import { SwitchContext } from "@lib/utilities/switch";
import { Connected } from "@lib/components/Connected";

import { Item, ItemProps } from "./components";

export type { ItemProps as SwitchItemProps };

export interface SwitchProps {
  children?: React.ReactNode;
  className?: string;
  selection: Record<string, boolean>;
  onSelect: (id: string) => void;
}

function SwitchBase(props: SwitchProps) {
  const { children, className, selection, onSelect } = props;

  const style = css`
    ${Item} {
      cursor: pointer;
    }
  `;

  const ItemsMarkup = React.Children.map(children, (child) => (
    <Connected.Item>{child}</Connected.Item>
  ));

  return (
    <SwitchContext.Provider value={{ selection, onSelect }}>
      <Connected className={className} css={style} align="stretch">
        {ItemsMarkup}
      </Connected>
    </SwitchContext.Provider>
  );
}

export const Switch = Object.assign(SwitchBase, {
  Item,
  displayName: "Switch",
});
