import { ReactNode } from "react";
import { Browsable, Channel, User } from "@gatsby-tv/types";

export type FetchResponse<K extends string, T> = {
  [key in K]?: T;
} & {
  loading?: boolean;
  error?: true | Error;
};

export type InfiniteFetchResponse<K extends string, T> = {
  [key in K]?: T[];
} & {
  loading?: boolean;
  error?: true | Error;
  generator: () => void;
};

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

export type VideoInfoFormat = "full" | "nochannel" | "nostats";
export type ChannelContentTab = "videos" | "playlists" | "shows";
