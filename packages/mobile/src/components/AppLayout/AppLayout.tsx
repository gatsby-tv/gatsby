import React from "react";
import { NextComponentType, NextPageContext } from "next";
import { Frame, Box } from "@gatsby-tv/components";

import { PreAlpha } from "@src/components/PreAlpha";
import { Topbar } from "@src/components/Topbar";

export interface AppLayoutProps<T> {
  page: NextComponentType<NextPageContext, any, T>;
  $props: T;
}

export function AppLayout<T>(props: AppLayoutProps<T>): React.ReactElement {
  const { page: Page, $props } = props;

  return (
    <Box absolute expand>
      <Frame topbar={Topbar}>
        <PreAlpha />
        <Page {...$props} />
      </Frame>
    </Box>
  );
}
