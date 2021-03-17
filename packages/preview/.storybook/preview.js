import React from "react";
import { AppProvider } from "@gatsby-tv/components";
import "@gatsby-tv/components/static/fonts.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "fullscreen",
};

export const decorators = [
  (Story) => (
    <AppProvider theme="dark">
      <div style={{ overflow: "hidden", height: "100vh" }}>
        <Story />
      </div>
    </AppProvider>
  ),
];
