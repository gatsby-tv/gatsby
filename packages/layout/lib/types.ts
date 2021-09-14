import { ReactNode } from 'react';
import { Browsable, Channel, User } from '@gatsby-tv/types';

export type ChannelLinkProps = {
  children?: ReactNode;
  className?: string;
  channel: Channel;
};

export type ContentLinkProps = {
  children?: ReactNode;
  className?: string;
  content: Browsable;
};

export type UserLinkProps = {
  children?: ReactNode;
  className?: string;
  user: User;
};

export type LinkProps = ChannelLinkProps | ContentLinkProps | UserLinkProps;

export type VideoInfoFormat = 'full' | 'nochannel' | 'nostats';
export type ChannelContentTab = 'videos' | 'playlists' | 'shows';

export function isChannelLink(link: LinkProps): link is ChannelLinkProps {
  return (link as ChannelLinkProps).channel !== undefined;
}

export function isContentLink(link: LinkProps): link is ContentLinkProps {
  return (link as ContentLinkProps).content !== undefined;
}

export function isUserLink(link: LinkProps): link is UserLinkProps {
  return (link as UserLinkProps).user !== undefined;
}
