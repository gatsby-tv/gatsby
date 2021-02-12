import React, { forwardRef } from "react";
import styled, { css } from "styled-components";
import { ifExists } from "@gatsby-tv/utilities";

import { cssProperty } from "@lib/styles/property";

export interface LinkProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
  underline?: boolean;
  overlay?: boolean;
  external?: boolean;
  zIndex?: number;
  onClick?: () => void;
}

const cssOverlay = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const cssUnderline = css`
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: currentcolor;
    transform: scaleX(0);
    transform-origin: bottom left;
    transition: transform ${(props) => props.theme.duration.faster} ease;
  }

  &:hover:after {
    transform: scaleX(1);
  }
`;

const LinkStyle = styled.a<LinkProps>`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  ${(props) => cssProperty("z-index", props.zIndex?.toString())}
  ${(props) => ifExists(props.overlay, cssOverlay)}
  ${(props) => ifExists(props.underline, cssUnderline)}
`;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (props: LinkProps, ref) => {
    const { children, external, ...rest } = props;
    const target = external ? "_blank" : undefined;
    const rel = external ? "noopener noreferrer" : undefined;

    const linkProps = {
      rel,
      target,
      external,
      ...rest,
    };

    return (
      <LinkStyle ref={ref} {...linkProps}>
        {children}
      </LinkStyle>
    );
  }
);

Link.displayName = "Link";
