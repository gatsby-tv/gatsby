import "styled-components";
import {} from "styled-components/cssprop";
import "@gatsby-tv/utilities";
import { UserAccount } from "@gatsby-tv/types";

declare module "styled-components" {
  export interface DefaultTheme {
    [key: string]: any;
  }
}

declare module "@gatsby-tv/utilities" {
  export interface GlobalState {
    user?: UserAccount;
    token?: string;
  }

  export interface GlobalAction {
    type: "setUser";
    token?: string;
  }
}
