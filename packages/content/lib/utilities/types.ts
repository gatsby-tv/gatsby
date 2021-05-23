import {
  LinkProps,
  ChannelLinkProps,
  ContentLinkProps,
  UserLinkProps,
} from '@lib/types';

export function isChannelLink(link: LinkProps): link is ChannelLinkProps {
  return (link as ChannelLinkProps).channel !== undefined;
}

export function isContentLink(link: LinkProps): link is ContentLinkProps {
  return (link as ContentLinkProps).content !== undefined;
}

export function isUserLink(link: LinkProps): link is UserLinkProps {
  return (link as UserLinkProps).user !== undefined;
}
