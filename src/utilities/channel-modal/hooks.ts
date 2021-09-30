import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { Channel } from '@gatsby-tv/types';

import { ChannelModalContext, ChannelModalContextType } from './context';

export function useChannelModalContext(): ChannelModalContextType {
  const [active, setActive] = useState(false);
  const channel = useRef<Channel | undefined>(undefined);

  useEffect(() => {
    if (active) return;
    const id = setTimeout(() => void (channel.current = undefined), 300);
    return () => clearTimeout(id);
  }, [active]);

  const setChannel = useCallback(
    (value: SetStateAction<Channel | undefined>) => {
      const update =
        typeof value === 'function' ? value(channel.current) : value;

      setActive(Boolean(update));
      if (update) return void (channel.current = update);
    },
    []
  );

  return {
    active,
    channel: channel.current,
    setChannel,
  };
}

export function useChannelModalState(): ChannelModalContextType {
  const context = useContext(ChannelModalContext);

  if (!context) {
    throw new Error('Channel modal context is missing for component.');
  }

  return context;
}

export function useChannelModal(): [
  Channel | undefined,
  Dispatch<SetStateAction<Channel | undefined>>
] {
  const context = useContext(ChannelModalContext);

  if (!context) {
    throw new Error('Channel modal context is missing for component.');
  }

  const { channel, setChannel } = context;
  return [channel, setChannel];
}
