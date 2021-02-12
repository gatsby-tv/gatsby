import React, { forwardRef } from "react";

import {
  Link as LinkBase,
  LinkProps as LinkBaseProps,
} from "@lib/components/Link";
import { Flex } from "@lib/components/Flex";
import { Selection, SelectionItemProps } from "@lib/components/Selection";

export type LinkProps = SelectionItemProps & LinkBaseProps;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (props: LinkProps, ref) => {
    const {
      children,
      id,
      className,
      option,
      ariaControls,
      ...linkProps
    } = props;

    const itemProps = {
      id,
      className,
      option,
      ariaControls,
    };

    return (
      <Selection.Item {...itemProps}>
        <LinkBase ref={ref} {...linkProps}>
          <Flex expand center>
            {children}
          </Flex>
        </LinkBase>
      </Selection.Item>
    );
  }
);

Link.displayName = "Link";
