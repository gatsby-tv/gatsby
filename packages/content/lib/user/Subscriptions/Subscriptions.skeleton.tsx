import React from "react";
import { Rule, TextPlaceholder } from "@gatsby-tv/components";
import Preview from "@gatsby-tv/preview";

import { Info } from "@lib/video/Info";
import { ListingContextType } from "@lib/utilities/listing";

import styles from "./Subscriptions.scss";

export type SkeletonProps = Omit<ListingContextType, "id" | "link">;

export function Skeleton(props: SkeletonProps): React.ReactElement {
  const { preview = "column", info = "full", avatar } = props;

  const PreviewsMarkup = [...Array(24)].map((_, index) => (
    <Preview
      key={`Preview.Skeleton.${index}`}
      format={preview}
      info={<Info format={info} avatar={avatar} />}
    />
  ));

  return (
    <>
      <Rule className={styles.SkeletonRule} />
      <TextPlaceholder
        className={styles.SkeletonHeader}
        font="display-medium"
        heading
        width={0.1}
      />
      <div className={styles.SkeletonSection}>{PreviewsMarkup}</div>
    </>
  );
}
