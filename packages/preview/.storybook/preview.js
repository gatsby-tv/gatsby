import React from "react";
import { AppProvider } from "@gatsby-tv/components";
import { useIPFSNode, IPFSContext } from "@gatsby-tv/utilities";
import "@gatsby-tv/components/dist/fonts.css";
import "@gatsby-tv/components/dist/styles.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (Story) => {
    const node = useIPFSNode();

    return (
      <AppProvider>
        <IPFSContext.Provider value={node}>
          <Story />
        </IPFSContext.Provider>
      </AppProvider>
    );
  },
];
