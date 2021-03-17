import { ReactNode } from "react";
import { Content } from "@gatsby-tv/types";

export type PreviewFormat = "column" | "row" | "compact";

export type PreviewProps = {
  content: Content;
  format?: PreviewFormat;
  info?: ReactNode;
  link?: ReactNode;
  ariaPosInSet?: number;
  ariaSetSize?: number;
};

export type PreviewSkeletonProps = {
  format?: PreviewFormat;
  info?: ReactNode;
};
