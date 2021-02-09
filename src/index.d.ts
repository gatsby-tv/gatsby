/* eslint-disable @typescript-eslint/no-empty-interface */

import "styled-components";
import {} from "styled-components/cssprop";
import "@gatsby-tv/utilities";
import { Theme } from "@gatsby-tv/components";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

declare module "@gatsby-tv/utilities" {
  export interface GlobalState {}
  export interface GlobalAction {}
}
