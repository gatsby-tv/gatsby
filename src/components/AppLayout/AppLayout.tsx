import React from "react";
import { NextComponentType, NextPageContext } from "next";
import { Frame, Box } from "@gatsby-tv/components";

import { Topbar } from "@src/components/Topbar";

export interface AppLayoutProps<T> {
  page: NextComponentType<NextPageContext, any, T>;
  $props: T;
}

export function AppLayout<T>(props: AppLayoutProps<T>): React.ReactElement {
  const { page: Page, $props } = props;

  return (
    <Frame topbar={<Topbar />}>
      <Box padding={["2px", "50px", "0px"]}>
        <Page {...$props} />
      </Box>
    </Frame>
  );
}
