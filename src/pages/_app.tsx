import React, { useState, useEffect } from "react";
import { AppProps } from "next/app";
import { AppProvider } from "@gatsby-tv/components";
import "@gatsby-tv/components/static/fonts.css";

import { useIPFSInit, IPFSContext } from "@src/utilities/ipfs";

export default function App({ Component, pageProps }: AppProps) {
  const context = useIPFSInit();

  return (
    <AppProvider theme="dark">
      <IPFSContext.Provider value={context}>
        <Component {...pageProps} />
      </IPFSContext.Provider>
    </AppProvider>
  );
}
