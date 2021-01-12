import React, { useReducer, useEffect } from "react";
import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import {
  useIPFSNode,
  IPFSContext,
  GlobalContext,
  GlobalState,
  GlobalAction,
} from "@gatsby-tv/utilities";
import { AppProvider } from "@gatsby-tv/components";
import "@gatsby-tv/components/static/fonts.css";

import { PreAlpha } from "@src/components/PreAlpha";
import { AppLayout } from "@src/components/AppLayout";
import { fetcher } from "@src/utilities/fetcher";

export default function App({
  Component,
  pageProps,
}: AppProps): React.ReactElement {
  const node = useIPFSNode();

  const [globals, dispatch] = useReducer(
    (state: GlobalState, action: GlobalAction) => {
      switch (action.type) {
        case "setUser":
          if (action.store && action.user === undefined) {
            window.localStorage.removeItem("user");
          } else if (action.store) {
            window.localStorage.setItem("user", action.user as string);
          }

          return { ...state, user: action.user };
      }
    },
    {
      user: undefined,
    }
  );

  useEffect(() => {
    if (!globals.user) {
      const user = window.localStorage.getItem("user") ?? undefined;
      dispatch({ type: "setUser", user });
    }
  }, []);

  return (
    <AppProvider theme="dark">
      <GlobalContext.Provider value={[globals, dispatch]}>
        <SWRConfig value={{ fetcher }}>
          <IPFSContext.Provider value={node}>
            <PreAlpha />
            <AppLayout page={Component} $props={pageProps} />
          </IPFSContext.Provider>
        </SWRConfig>
      </GlobalContext.Provider>
    </AppProvider>
  );
}
