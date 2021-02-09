import React from "react";
import { Flex, TextPlaceholder } from "@gatsby-tv/components";
import { useTheme } from "@gatsby-tv/utilities";

import { PreviewSlider } from "@src/components/PreviewSlider";

export interface SkeletonProps {
  groups: number;
}

export function Skeleton(props: SkeletonProps): React.ReactElement {
  const { groups } = props;
  const theme = useTheme();

  const flexProps = {
    column: true,
    w: 1,
    marginTop: theme.spacing[0.5],
    gap: theme.spacing[1.5],
  };

  const ItemsMarkup = [...Array(5)].map((_, index) => (
    <Flex key={`skeleton.${index}`} column gap={theme.spacing[1.5]}>
      <TextPlaceholder heading font={theme.font[2]} w={0.1} />
      <PreviewSlider.Skeleton groups={groups} />
    </Flex>
  ));

  return <Flex {...flexProps}>{ItemsMarkup}</Flex>;
}
