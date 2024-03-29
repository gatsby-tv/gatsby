/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useContext,
  RefObject,
  Dispatch,
  SetStateAction,
} from 'react';
import HLS from 'hls.js';
// @ts-ignore
import HLSIPFSLoader from 'hlsjs-ipfs-loader';
import all from 'it-all';
import { IPFSContent } from '@gatsby-tv/types';

import { useVolatileState } from '@lib/use-volatile-state';
import { ContextError, UniqueContextError } from '@lib/errors';

import { IPFSContext, IPFSContextType } from './context';

export function useIPFSContext(ipfs: any, bootstrap: string[] = []): IPFSContextType {
  const context = useContext(IPFSContext);

  if (context) {
    throw new UniqueContextError('IPFS');
  }

  const ipfsRef = useRef<any>(ipfs);

  useEffect(() => void (ipfsRef.current = ipfs), [ipfs]);

  useEffect(() => {
    async function load() {
      try {
        bootstrap.forEach((addr) => ipfs.swarm.connect(addr));
        const { id } = await ipfs.id();
        console.log(`IPFS node ready at /p2p/${id}`);
      } catch (error) {
        console.error(error);
      }
    }

    if (ipfs) load();
    HLS.DefaultConfig.loader = HLSIPFSLoader;

    return () => {
      if (!ipfsRef.current || !ipfsRef.current.stop) return;
      ipfsRef.current.stop();
    };
  }, [Boolean(ipfs)]);

  return ipfsRef.current;
}

export function useIPFS(): IPFSContextType {
  const context = useContext(IPFSContext);

  if (!context) {
    throw new ContextError('IPFS');
  }

  return context;
}

export type IPFSContentState = {
  url?: string;
  loading: boolean;
};

export function useIPFSContent(content?: IPFSContent): IPFSContentState {
  const ipfs = useIPFS();

  const [result, setResult] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [, setCancel] = useState<(() => void) | undefined>(undefined);

  useEffect(() => {
    if (!ipfs || !content) return;

    async function fetcher() {
      if (!content) return;
      const generator = await ipfs.cat(`/ipfs/${content.hash}`);
      const data: BlobPart[] = await all(generator);
      const blob = new Blob([...data], { type: content.mimeType });
      return window.URL.createObjectURL(blob);
    }

    const cancel = new Promise((_, reject) =>
      setCancel((current) => {
        current?.();
        return reject;
      })
    );

    Promise.race([fetcher(), cancel])
      .then((url: any) => {
        setResult(url);
        setLoading(false);
      })
      .catch(() => undefined);
  }, [ipfs, content]);

  useEffect(() => {
    if (!result) return;
    return () => window.URL.revokeObjectURL(result);
  }, [result]);

  return { url: result, loading };
}

export interface IPFSPeersState {
  peers: Array<any>;
  loading: boolean;
}

export function useIPFSPeers(): IPFSPeersState {
  const ipfs = useIPFS();

  const [peers, setPeers] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [, setCancel] = useState<(() => void) | undefined>(undefined);
  const [refresh, setRefresh] = useVolatileState();

  useEffect(() => {
    if (!ipfs) return;

    const cancel = new Promise((_, reject) =>
      setCancel((current) => {
        current?.();
        return reject;
      })
    );

    Promise.race([ipfs.swarm.peers(), cancel])
      .then((peers) => {
        setPeers(peers);
        setLoading(false);
      })
      .catch(() => undefined);
  }, [ipfs, refresh]);

  useEffect(() => {
    if (!ipfs) return;
    const id = setInterval(() => setRefresh(), 3000);
    return () => clearInterval(id);
  }, [ipfs]);

  return { peers, loading };
}

export type IPFSStreamState = {
  ref: RefObject<HTMLVideoElement>;
  quality: number;
  levels: Record<number, number>;
};

export type IPFSStreamController = {
  stream: IPFSStreamState;
  setQuality: Dispatch<SetStateAction<number>>;
};

export function useIPFSVideoStream(hash?: string): IPFSStreamController {
  const ref = useRef<HTMLVideoElement>(null);
  const hls = useRef<HLS | null>(null);
  const [levels, setLevels] = useState<Record<number, number>>({});
  const ipfs = useIPFS();

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

    return () => {
      hls.current?.destroy();
      setLevels({});
    };
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
