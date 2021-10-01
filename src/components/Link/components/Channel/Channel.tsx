import { ReactElement } from 'react';
import NextLink from 'next/link';
import { LinkProps, isChannelLink } from '@gatsby-tv/layout';

import { Content } from '../Content';

export type ChannelProps = LinkProps;

export function Channel(props: ChannelProps): ReactElement {
  return <Content {...props} />

  // return isChannelLink(props) ? (
  //   <NextLink href={`/${props.channel.handle}`} passHref>
  //     {props.children}
  //   </NextLink>
  // ) : (
  //   <Content {...props} />
  // );
}
