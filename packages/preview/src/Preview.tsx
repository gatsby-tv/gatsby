import React from "react";
import { css } from "styled-components";
import { Box, Flex, Image, Optional, Labelled } from "@gatsby-tv/components";
import { useTheme, useUniqueId } from "@gatsby-tv/utilities";

import { PreviewProps } from "@src/types";
import { Overlay } from "@src/components/Overlay";
import { Skeleton } from "@src/variants/Skeleton";

function PreviewBase(props: PreviewProps): React.ReactElement {
  const {
    content,
    format = "column",
    info: Info,
    link: Link,
    ariaPosInSet,
    ariaSetSize,
  } = props;
  const id = useUniqueId("preview");
  const theme = useTheme();

  const style = css`
    & > a {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
    }
  `;

  const imageProps = {
    src: content.thumbnail,
    rounded: theme.border.radius.smallest,
    aspectRatio: 0.5625,
    overlay: <Overlay content={content} />,
  };

  const itemProps = {
    active: format !== "column",
    $props: { basis: format === "compact" ? 2.0 : 0.8 },
  };

  const flexProps = {
    column: format === "column",
    gap: theme.spacing[1],
    "aria-posinset": ariaPosInSet,
    "aria-setsize": ariaSetSize,
  };

  const InfoMarkup = Info ? (
    <Optional component={Flex.Item} {...itemProps}>
      {Info}
    </Optional>
  ) : null;

  return (
    <Labelled as="article" component={Flex} $props={flexProps}>
      <Image {...imageProps} />
      {InfoMarkup}
      <Box absolute expand css={style}>
        {Link}
      </Box>
    </Labelled>
  );
}

export const Preview = Object.assign(PreviewBase, {
  Skeleton,
  displayName: "Preview",
});
