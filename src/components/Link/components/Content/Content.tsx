import { ReactElement } from 'react';
import NextLink from 'next/link';
import { Button, Link } from '@gatsby-tv/components';
import {
  LinkProps,
  isContentLink,
  isUserLink,
  isChannelLink,
} from '@gatsby-tv/content';

import { useChannelModal } from '@src/utilities/channel-modal';

export type ContentProps = LinkProps;

export function Content(props: ContentProps): ReactElement {
  const [, setChannel] = useChannelModal();

  if (isContentLink(props)) {
    return (
      <NextLink href={`/v/${props.content._id}`} passHref>
        <Link className={props.className}>{props.children}</Link>
      </NextLink>
    );
  } else if (isUserLink(props)) {
    return (
      <NextLink href={`/u/${props.user.handle}`} passHref>
        <Link className={props.className}>{props.children}</Link>
      </NextLink>
    );
  } else if (isChannelLink(props)) {
    return (
      <Button
        className={props.className}
        unstyled
        onClick={() => setChannel(props.channel)}
      >
        {props.children}
      </Button>
    );
  } else {
    throw new Error('Content link was passed unknown prop.');
  }
}
