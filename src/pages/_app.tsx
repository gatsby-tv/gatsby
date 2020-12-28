import React, { useState, useEffect } from "react";
import { AppProps } from "next/app";
import { useIpfsInit, IpfsContext } from "@gatsby-tv/utilities";
import { AppProvider, Portal, Box, TextMeta } from "@gatsby-tv/components";
import "@gatsby-tv/components/static/fonts.css";

export default function App({ Component, pageProps }: AppProps) {
  const context = useIpfsInit();

  return (
    <AppProvider $theme="dark">
      <IpfsContext.Provider value={context}>
        <Portal id="pre-alpha">
          <Box $absolute $bottom="2rem" $right="2rem">
            <Box
              css={`
                border-radius: 7px;
              `}
              $bg="black"
              $padding="1rem"
            >
              <TextMeta $bold $size="large">
                Pre-Alpha
              </TextMeta>
            </Box>
          </Box>
        </Portal>
        <Component {...pageProps} />
      </IpfsContext.Provider>
    </AppProvider>
  );
}
