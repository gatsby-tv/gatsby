import { useState, useEffect, useContext } from "react";
import IPFS from "ipfs"; 

import { IPFSContext } from "./context";

let ipfs = null;

export function useIPFSInit() {
  const [isReady, setIsReady] = useState(Boolean(ipfs));
  const [error, setError] = useState<Error>(null);

  useEffect(() => {
    async function loadIPFS() {
      try {
        ipfs = await IPFS.create();
      } catch(error) {
        ipfs = null;
        setError(error);
      }

      setIsReady(Boolean(ipfs));
    }

    loadIPFS();

    return () => {
      if (ipfs && ipfs.stop) {
        ipfs.stop();
        ipfs = null;
        setIsReady(false);
      }
    }
  }, []);

  return { ipfs, isReady, error };
}

export function useIPFS(command, args) {
  const context = useContext(IPFSContext);
  const [result, setResult] = useState<any>(null);

  if (!context) {
    throw new Error("No IPFS context provided for component.");
  }

  useEffect(() => {
    async function callIPFS() {
      setResult(context.ipfs ? await context.ipfs[command](args) : null);
    }

    callIPFS();
  }, [context.ipfs, command, args]);

  return result;
}

export function useIPFSContent(cid, contentType) {
  const generator = useIPFS("cat", cid);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      const data = [];

      for await (const chunk of generator) {
        data.push(chunk);
      }

      const blob = new Blob([Buffer.concat(data)], { type: contentType });
      setResult(window.URL.createObjectURL(blob));
    }

    generator && loadData();
  }, [generator]);

  useEffect(() => {
    return () => window.URL.revokeObjectURL(result);
  }, [result]);

  return result;
}
