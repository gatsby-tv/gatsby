import { ReactNode, AriaAttributes } from "react";
import { Browsable, VideoBookmark } from "@gatsby-tv/types";

export type PreviewFormat = "column" | "row" | "compact";

export interface PreviewProps extends AriaAttributes {
  content?: Browsable;
  bookmark?: VideoBookmark;
  format?: PreviewFormat;
  info?: ReactNode;
  link?: ReactNode;
}
