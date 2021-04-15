import React from "react";
import { TextBox, TextPlaceholder } from "@gatsby-tv/components";

import styles from "./Description.scss";

export function Skeleton(): React.ReactElement {
  return (
    <TextBox>
      <TextPlaceholder font="body-large" width={0.7} />
      <TextPlaceholder font="body-large" width={0.5} />
      <TextPlaceholder font="body-large" width={0.3} />
    </TextBox>
  );
}
