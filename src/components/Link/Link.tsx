import React from "react";
import NextLink from "next/link";
import {
  Link as GatsbyLink,
  LinkProps as GatsbyLinkProps,
} from "@gatsby-tv/components";

export type LinkProps = GatsbyLinkProps;

export function Link(props: LinkProps): React.ReactElement {
  const { href, ...linkProps } = props;

  return (
    <NextLink href={href} passHref>
      {/* @ts-ignore */}
      <GatsbyLink {...linkProps} />
    </NextLink>
  );
}
