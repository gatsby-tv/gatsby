import { createContext, Dispatch, SetStateAction } from 'react';
import { Channel } from '@gatsby-tv/types';

export type ChannelModalContextType = {
  active: boolean;
  channel?: Channel;
  setChannel: Dispatch<SetStateAction<Channel | undefined>>;
};

export const ChannelModalContext = createContext<
  ChannelModalContextType | undefined
>(undefined);
