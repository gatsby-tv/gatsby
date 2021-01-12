import "styled-components";
import {} from "styled-components/cssprop";
import "@gatsby-tv/utilities";

declare module "styled-components" {
  export interface DefaultTheme {
    [key: string]: any;
  }
}

declare module "@gatsby-tv/utilities" {
  export interface GlobalState {
    user?: string;
  }

  export interface GlobalAction {
    type: "setUser";
    user?: string;
    store?: boolean;
  }
}
