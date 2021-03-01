import React from "react";
import { Flex, Optional } from "@gatsby-tv/components";
import { ifExists, useTheme } from "@gatsby-tv/utilities";

import { Preview } from "@src/components/Preview";

import { Title } from "./components/Title";

export interface SkeletonProps {
  groups: number;
  title?: string;
  href?: string;
  thin?: boolean;
}

export function Skeleton(props: SkeletonProps): React.ReactElement {
  const { groups, ...titleProps } = props;
  const theme = useTheme();

  const optionalProps = {
    active: ifExists(props.title),
    $props: { column: true, gap: theme.spacing[1] },
  };

  const PreviewsMarkup = [...Array(groups)].map((_, index) => (
    <Preview.Skeleton key={`skeleton.${index}`} avatar={theme.avatar.smaller} />
  ));

  return (
    <Optional component={Flex} {...optionalProps}>
      <Title {...titleProps} />
      <Flex w={1} gap={theme.spacing[1]}>
        {PreviewsMarkup}
      </Flex>
    </Optional>
  );
}
