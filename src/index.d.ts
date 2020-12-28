import "styled-components";
import {} from "styled-components/cssprop";

declare module "styled-components" {
  export interface DefaultTheme {
    [key: string]: any;
  }
}
