import React from "react";
import NextLink from "next/link";
import { Link as LinkComponent } from "@gatsby-tv/components";

import { Content } from "./variants/Content";
import { Channel } from "./variants/Channel";

export interface LinkProps {
  children?: React.ReactNode;
  href: string;
  component?: React.FC<any>;
  $props?: any;
}

export function Link(props: LinkProps): React.ReactElement {
  const {
    children,
    component: Component = LinkComponent,
    href,
    $props = {},
  } = props;

  return (
    <NextLink href={href} passHref>
      <Component {...$props}>{children}</Component>
    </NextLink>
  );
}

Link.Content = Content;
Link.Channel = Channel;
