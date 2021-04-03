import React, { ReactNode } from "react";
import { Flex, Box, Optional } from "@gatsby-tv/components";
import { Content } from "@gatsby-tv/types";
import { Link } from "@gatsby-tv/next";
import Preview from "@gatsby-tv/preview";
import { ifExists, useTheme } from "@gatsby-tv/utilities";

import { Info } from "@src/components/Info";
import { useListing } from "@src/utilities/listing";
import { usePageMargin } from "@src/utilities/use-page-margin";

export type ArticleProps = Content & {
  ariaPosInSet: number;
};

export function Article(props: ArticleProps): React.ReactElement {
  const theme = useTheme();
  const { ariaPosInSet, ...content } = props;
  const { format, nochannel, avatar } = useListing();
  const margin = usePageMargin();

  const boxProps = {
    active: format === "column",
    $props: { margin },
  };

  const previewProps = {
    content,
    format,
    link: <Link href={`/v/${content._id}`} />,
    ariaPosInSet,
    ariaSetSize: -1,
  };

  const InfoMarkup = (
    <Optional component={Box} {...boxProps}>
      <Info content={content} channel={!nochannel} avatar={avatar} />
    </Optional>
  );

  return (
    <Flex.Item>
      <Preview info={InfoMarkup} {...previewProps} />
    </Flex.Item>
  );
}
