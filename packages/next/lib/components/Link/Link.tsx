import React from "react";
import NextLink from "next/link";
import { Link as GatsbyLink } from "@gatsby-tv/components";

export interface LinkProps {
  children?: React.ReactNode;
  href: string;
  component?: React.FC<any>;
  $props?: any;
}

export function Link(props: LinkProps): React.ReactElement {
  const {
    children,
    component: Component = GatsbyLink,
    href,
    $props = {},
  } = props;

  return (
    <NextLink href={href} passHref>
      <Component {...$props}>{children}</Component>
    </NextLink>
  );
}
