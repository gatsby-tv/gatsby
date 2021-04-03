import React, { forwardRef, Ref } from "react";
import styled from "styled-components";
import { ExtendRight } from "@gatsby-tv/icons";
import { ifExists, useTheme } from "@gatsby-tv/utilities";

import {
  Link as LinkBase,
  LinkProps as LinkBaseProps,
} from "@lib/components/Link";
import { Box } from "@lib/components/Box";
import { Flex } from "@lib/components/Flex";
import { Icon } from "@lib/components/Icon";
import { DisplaySize } from "@lib/types";
import { cssProperty } from "@lib/styles/property";
import { cssTextDisplay } from "@lib/styles/typography";

type TextProps = {
  children?: React.ReactNode;
  id?: string;
  className?: string;
  size?: DisplaySize;
  thin?: boolean;
};

export type LinkProps = TextProps & Omit<LinkBaseProps, "underline">;

const LinkStyle = styled.h1<TextProps>`
  ${(props) => cssTextDisplay(props.size ?? "medium")}
  ${(props) => cssProperty("font-weight", ifExists(props.thin, 500))}
`;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (props: LinkProps, ref: Ref<HTMLAnchorElement>) => {
    const theme = useTheme();
    const { children, size, thin, id, className, ...linkProps } = props;

    const iconProps = {
      src: ExtendRight,
      w: size === "large" ? theme.icon.large : theme.icon.small,
    };

    const anchorProps = {
      id,
      className,
      size,
      thin,
    };

    return (
      <Box w="fit-content">
        <LinkBase ref={ref} underline {...linkProps}>
          <Flex gap={theme.spacing[1]} align="center" paddingBottom="0.2rem">
            <LinkStyle {...anchorProps}>{children}</LinkStyle>
            <Icon {...iconProps} />
          </Flex>
        </LinkBase>
      </Box>
    );
  }
);
