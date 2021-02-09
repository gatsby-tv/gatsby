import React from "react";
import { Carousel, Image } from "@gatsby-tv/components";
import { useTheme } from "@gatsby-tv/utilities";

export interface SkeletonProps {
  groups: number;
}

export function Skeleton(props: SkeletonProps): React.ReactElement {
  const { groups } = props;
  const theme = useTheme();

  const SlidesMarkup = [...Array(groups)].map((_, index) => (
    <Carousel.Slide key={`skeleton.${index}`}>
      <Image rounded={theme.border.radius.smallest} aspectRatio={2} />
    </Carousel.Slide>
  ));

  return (
    <Carousel groups={groups} gap={theme.spacing[1]}>
      {SlidesMarkup}
    </Carousel>
  );
}
