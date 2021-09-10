import { FC, ReactNode, ReactElement } from 'react';
import NextLink from 'next/link';
import { Link as LinkComponent } from '@gatsby-tv/components';

import { Content } from './components/Content';
import { Channel } from './components/Channel';

export interface LinkProps {
  children?: ReactNode;
  href: string;
  component?: FC<any>;
  $props?: any;
}

export function Link(props: LinkProps): ReactElement {
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
