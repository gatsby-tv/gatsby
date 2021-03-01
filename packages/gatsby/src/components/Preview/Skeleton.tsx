import React from "react";
import {
  Optional,
  Flex,
  Image,
} from "@gatsby-tv/components";
import { ifExists, useTheme } from "@gatsby-tv/utilities";

import { PreviewFormat } from "@src/types";
import { Info } from "@src/components/Info";

export interface SkeletonProps {
  format?: PreviewFormat;
  avatar?: string;
}

export function Skeleton(props: SkeletonProps): React.ReactElement {
  const theme = useTheme();
  const { format = "default", avatar = theme.avatar.base } = props;

  const flexProps = {
    column: format !== "compact",
    w: 1,
    gap: theme.spacing[1],
    marginBottom: theme.spacing[1],
  };

  const itemOptionalProps = {
    active: format === "compact",
    $props: { basis: 0.8 },
  };

  const infoProps = {
    content: true,
    avatar: ifExists(format !== "compact", avatar),
    channel: format !== "nochannel",
  };

  return (
    <Flex {...flexProps}>
      <Image rounded={theme.border.radius.smallest} aspectRatio={0.5625} />
      <Optional component={Flex.Item} {...itemOptionalProps}>
        <Info.Skeleton {...infoProps} />
      </Optional>
    </Flex>
  );
}
