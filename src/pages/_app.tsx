import React from "react";
import { AppProps } from "next/app";
import { useIPFSNode, IPFSContext } from "@gatsby-tv/utilities";
import { AppProvider, Portal, Box, TextMeta } from "@gatsby-tv/components";
import "@gatsby-tv/components/static/fonts.css";

export default function App({
  Component,
  pageProps,
}: AppProps): React.ReactElement {
  const node = useIPFSNode();

  return (
    <AppProvider $theme="dark">
      <IPFSContext.Provider value={node}>
        <Portal id="pre-alpha">
          <Box $absolute $bottom="2rem" $right="2rem">
            <Box $rounded="8px" $bg="#010101" $padding="1rem">
              <TextMeta.Link
                href="https://github.com/gatsby-tv/gatsby/issues"
                $external
                $bold
                $size="large"
              >
                Pre-Alpha
              </TextMeta.Link>
            </Box>
          </Box>
        </Portal>
        <Component {...pageProps} />
      </IPFSContext.Provider>
    </AppProvider>
  );
}
