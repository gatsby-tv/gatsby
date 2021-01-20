import React from "react";
import { NextComponentType, NextPageContext } from "next";
import { Frame, Box } from "@gatsby-tv/components";
import { ifExists, useToggle } from "@gatsby-tv/utilities";

import { Topbar } from "@src/components/Topbar";
import { Sidebar } from "@src/components/Sidebar";

export interface AppLayoutProps<T> {
  page: NextComponentType<NextPageContext, any, T>;
  $props: T;
}

export function AppLayout<T>(props: AppLayoutProps<T>): React.ReactElement {
  const { page: Page, $props } = props;

  return (
    <Frame topbar={Topbar} sidebar={ifExists(false, Sidebar)} scrollHidden>
      <Page {...$props} />
    </Frame>
  );
}
