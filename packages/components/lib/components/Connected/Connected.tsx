import React from "react";
import { css } from "styled-components";

import { ConnectedContext } from "@lib/utilities/connected";
import { Flex, FlexProps } from "@lib/components/Flex";

import { Item, ItemProps, Connection } from "./components";

export type { ItemProps as ConnectedItemProps };

export interface ConnectedProps extends FlexProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  column?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

function ConnectedBase(props: ConnectedProps) {
  const { children, prefix, suffix, column, ...flexProps } = props;

  const style = css`
    > ${Connection}:first-child * {
      ${column
        ? "border-bottom-left-radius"
        : "border-top-right-radius"}: 0 !important;
      border-bottom-right-radius: 0 !important;

      &:after {
        ${column
          ? "border-bottom-left-radius"
          : "border-top-right-radius"}: 0 !important;
        border-bottom-right-radius: 0 !important;
      }
    }

    > ${Connection}:last-child * {
      border-top-left-radius: 0 !important;
      ${column
        ? "border-top-right-radius"
        : "border-bottom-left-radius"}: 0 !important;

      &:after {
        border-top-left-radius: 0 !important;
        ${column
          ? "border-top-right-radius"
          : "border-bottom-left-radius"}: 0 !important;
      }
    }

    > ${Item}:not(:first-child) * {
      border-top-left-radius: 0 !important;
      ${column
        ? "border-top-right-radius"
        : "border-bottom-left-radius"}: 0 !important;

      &:after {
        border-top-left-radius: 0 !important;
        ${column
          ? "border-top-right-radius"
          : "border-bottom-left-radius"}: 0 !important;
      }
    }

    > ${Item}:not(:last-child) * {
      ${column
        ? "border-bottom-left-radius"
        : "border-top-right-radius"}: 0 !important;
      border-bottom-right-radius: 0 !important;

      &:after {
        ${column
          ? "border-bottom-left-radius"
          : "border-top-right-radius"}: 0 !important;
        border-bottom-right-radius: 0 !important;
      }
    }
  `;

  const PrefixMarkup = prefix ? <Connection>{prefix}</Connection> : null;
  const SuffixMarkup = suffix ? <Connection>{suffix}</Connection> : null;

  return (
    <ConnectedContext.Provider value={{ column: column }}>
      <Flex css={style} column={column} {...flexProps}>
        {PrefixMarkup}
        {children}
        {SuffixMarkup}
      </Flex>
    </ConnectedContext.Provider>
  );
}

export const Connected = Object.assign(ConnectedBase, { Item });
