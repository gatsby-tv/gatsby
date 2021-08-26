/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useContext,
  useReducer,
  RefObject,
  Dispatch,
  SetStateAction,
} from 'react';
// @ts-ignore
import IPFS from 'ipfs';
import HLS from 'hls.js';
// @ts-ignore
import HLSIPFSLoader from 'hlsjs-ipfs-loader';
import all from 'it-all';
import { IPFSContent } from '@gatsby-tv/types';

import { useAsync } from '@lib/use-async';
import { ContextError } from '@lib/errors';

import { IPFSContext, IPFSContextType } from './context';

const IPFS_DEFAULT_CONFIG = {
  repo: `/ipfs/gatsby`,
};

export function useIPFSNode(bootstrap: string[] = []): IPFSContextType {
  const context = useContext(IPFSContext);

  if (context) {
    throw new Error('IPFS context is not unique');
  }

  const ipfsRef = useRef<any>(null);
  const [ipfs, setIPFS] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => void (ipfsRef.current = ipfs), [ipfs]);

  useEffect(() => {
    async function loadIPFS() {
      try {
        const ipfs = await IPFS.create(IPFS_DEFAULT_CONFIG);
        bootstrap.forEach(async (addr) => await ipfs.bootstrap.add(addr));
        const info = await ipfs.id();
        console.log(`IPFS node ready at /p2p/${info.id}`);
        setIPFS(ipfs);
      } catch (error) {
        console.error(error);
        setIPFS(null);
        setError(error);
      }
    }

    loadIPFS();
    HLS.DefaultConfig.loader = HLSIPFSLoader;

    return () => {
      if (!ipfsRef.current || !ipfsRef.current.stop) return;
      ipfsRef.current.stop();
      setIPFS(null);
    };
  }, []);

  return { ipfs, error };
}

export function useIPFS(): IPFSContextType {
  const context = useContext(IPFSContext);

  if (!context) {
    throw new ContextError('IPFS');
  }

  return context;
}

interface FetchAction {
  type: 'fetch';
}

interface SyncAction {
  type: 'sync';
  result: any;
}

type IPFSAction = FetchAction | SyncAction;

type IPFSCommandState = {
  loading: boolean;
  result?: any;
};

export function useIPFSCommand(
  command: string | [string],
  args?: Record<string, unknown> | string
): IPFSCommandState {
  const { ipfs } = useIPFS();
  const commandKey = JSON.stringify(command);

  const [state, dispatch] = useReducer(
    (state: IPFSCommandState, action: IPFSAction) => {
      switch (action.type) {
        case 'fetch':
          return state.loading ? state : { ...state, loading: true };

        case 'sync':
          return {
            ...state,
            result: action.result,
            loading: false,
          };

        default:
          return state;
      }
    },
    { result: undefined, loading: false }
  );

  useAsync(
    async () => {
      if (!state.loading) return;

      const method = [JSON.parse(commandKey)]
        .flat()
        .reduce((acc: any, key: string) => (acc ? acc[key] : undefined), ipfs);

      return method ? await method(args) : undefined;
    },
    (result) => dispatch({ type: 'sync', result }),
    [state.loading, ipfs, commandKey, args]
  );

  useEffect(() => dispatch({ type: 'fetch' }), [ipfs]);

  return state;
}

interface IPFSContentState {
  loading: boolean;
  url?: string;
}

export function useIPFSContent(content: IPFSContent): IPFSContentState {
  const { result: generator } = useIPFSCommand('cat', `/ipfs/${content.hash}`);

  const [state, dispatch] = useReducer(
    (state: IPFSContentState, action: IPFSAction) => {
      switch (action.type) {
        case 'fetch':
          return state.loading ? state : { ...state, loading: true };

        case 'sync':
          return {
            ...state,
            url: action.result,
            loading: false,
          };

        default:
          return state;
      }
    },
    { url: undefined, loading: false }
  );

  useAsync(
    async () => {
      if (!generator) return;
      const data: BlobPart[] = await all(generator);
      const blob = new Blob([...data], { type: content.mimeType });
      return window.URL.createObjectURL(blob);
    },
    (url) => dispatch({ type: 'sync', result: url }),
    [generator, content.mimeType]
  );

  useEffect(() => {
    return () => window.URL.revokeObjectURL(state.url as string);
  }, [state.url]);

  return state;
}

interface IPFSPeersState {
  loading: boolean;
  peers: Array<any>;
}

export function useIPFSPeers(): IPFSPeersState {
  const { ipfs } = useIPFS();

  const [state, dispatch] = useReducer(
    (state: IPFSPeersState, action: IPFSAction) => {
      switch (action.type) {
        case 'fetch':
          return state.loading ? state : { ...state, loading: true };

        case 'sync':
          return {
            ...state,
            peers: action.result,
            loading: false,
          };

        default:
          return state;
      }
    },
    { peers: [], loading: false }
  );

  useAsync(
    async () => {
      if (!state.loading || !ipfs) return;
      return await ipfs?.swarm?.peers();
    },
    (result) => dispatch({ type: 'sync', result }),
    [state.loading, ipfs]
  );

  useEffect(() => {
    dispatch({ type: 'fetch' });
    const id = setInterval(() => dispatch({ type: 'fetch' }), 3000);
    return () => clearInterval(id);
  }, [ipfs]);

  return state;
}

export type StreamState = {
  ref: RefObject<HTMLVideoElement>;
  quality: number;
  levels: Record<number, number>;
};

export function useIPFSVideoStream(hash?: string): {
  stream: StreamState;
  setQuality: Dispatch<SetStateAction<number>>;
} {
  const ref = useRef<HTMLVideoElement>(null);
  const hls = useRef<HLS | null>(null);
  const [levels, setLevels] = useState<Record<number, number>>({});
  const { ipfs } = useIPFS();

  const setQuality = useCallback((value: SetStateAction<number>) => {
    if (!hls.current?.levels) return;

    const update =
      typeof value === 'function' ? value(hls.current.currentLevel) : value;

    if (update !== -1 && !(update in hls.current.levels)) return;
    hls.current.currentLevel = update;
  }, []);

  useEffect(() => {
    if (!ref.current || !ipfs || !hash) return;
    if (!HLS.isSupported()) throw new Error('HLS is not supported');

    hls.current = new HLS();
    // @ts-ignore
    hls.current.config.ipfs = ipfs;
    // @ts-ignore
    hls.current.config.ipfsHash = hash;
    hls.current.loadSource('master.m3u8');
    hls.current.attachMedia(ref.current as HTMLVideoElement);

    hls.current.on(HLS.Events.MANIFEST_PARSED, () =>
      setLevels(
        hls.current
          ? Object.fromEntries(
              hls.current.levels.map((level, index) => [index, level.height])
            )
          : {}
      )
    );

    hls.current.on(HLS.Events.MANIFEST_PARSED, () =>
      ref.current?.play().catch(console.error)
    );

    return () => hls.current?.destroy();
  }, [ipfs, hash]);

  return {
    stream: {
      ref,
      quality: hls.current?.currentLevel ?? -1,
      levels,
    },
    setQuality,
  };
}
