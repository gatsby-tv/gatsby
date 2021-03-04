import React, { forwardRef } from "react";
import styled from "styled-components";
import { ifExists, useTheme } from "@gatsby-tv/utilities";

import { TextBox } from "@lib/components/TextBox";
import { Flex } from "@lib/components/Flex";
import { Connected } from "@lib/components/Connected";
import { Icon } from "@lib/components/Icon";
import { Optional } from "@lib/components/Optional";
import { Link as LinkComponent } from "@lib/components/Link";
import { IconSource } from "@lib/types";

export interface LinkProps {
  children?: string | [string];
  icon?: IconSource;
  href?: string;
  external?: boolean;
  onClick?: () => void;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (props: LinkProps, ref) => {
    const theme = useTheme();
    const { children, icon: IconComponent, href, external, onClick, ...rest } = props;

    const linkProps = {
      ref: ref as React.RefObject<HTMLAnchorElement>,
      href,
      external,
      onClick,
    };

    const optionalProps = {
      active: ifExists(href),
      $props: linkProps,
    };

    const flexProps = {
      active: ifExists(IconComponent),
      $props: {
        gap: theme.spacing[1],
      },
    };

    const IconMarkup = IconComponent ? (
      <Icon src={IconComponent} w={theme.icon.smaller} />
    ) : null;

    return (
      <Connected.Item>
        <Optional component={LinkComponent} {...optionalProps}>
          <Optional component={Flex} {...flexProps}>
            {IconMarkup}
            <TextBox font={theme.font[4]} weight={600}>
              {children}
            </TextBox>
          </Optional>
        </Optional>
      </Connected.Item>
    );
  }
);
