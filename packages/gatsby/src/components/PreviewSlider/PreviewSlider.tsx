import React from "react";
import { Flex, Optional, Slider } from "@gatsby-tv/components";
import { Browsable } from "@gatsby-tv/types";
import { ifExists, useTheme } from "@gatsby-tv/utilities";

import { Preview } from "@src/components/Preview";

import { Title } from "./components/Title";
import { Skeleton, SkeletonProps } from "./components/Skeleton";

export type { SkeletonProps as PreviewSliderSkeletonProps };

export interface PreviewSliderProps {
  content: Browsable[];
  groups: number;
  title?: string;
  loading?: boolean;
  href?: string;
  thin?: boolean;
}

function PreviewSliderBase(props: PreviewSliderProps): React.ReactElement {
  const { content, groups, ...titleProps } = props;
  const theme = useTheme();

  const optionalProps = {
    active: ifExists(props.title),
    $props: { column: true, gap: theme.spacing[1] },
  };

  const PreviewsMarkup = content.map((item, index) => (
    <Preview
      key={`${item._id}.${index}`}
      content={item}
      avatar={theme.avatar.smaller}
    />
  ));

  return (
    <Optional component={Flex} {...optionalProps}>
      <Title {...titleProps} />
      <Slider groups={groups} gap={theme.spacing[1]}>
        {PreviewsMarkup}
      </Slider>
    </Optional>
  );
}

export const PreviewSlider = Object.assign(PreviewSliderBase, {
  Skeleton,
  displayName: "PreviewSlider",
});
