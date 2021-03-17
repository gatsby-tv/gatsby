import React, { ReactNode } from "react";
import { Grid } from "@gatsby-tv/components";
import { Content } from "@gatsby-tv/types";
import { Link } from "@gatsby-tv/next";
import Preview from "@gatsby-tv/preview";

import { Info } from "@src/components/Info";
import { useListing } from "@src/utilities/listing";

export type ArticleProps = Content & {
  ariaPosInSet: number;
};

export function Article(props: ArticleProps): React.ReactElement {
  const { ariaPosInSet, ...content } = props;
  const { format, nochannel, avatar } = useListing();

  const previewProps = {
    content,
    format,
    info: <Info content={content} channel={!nochannel} avatar={avatar} />,
    link: <Link href={`/v/${content._id}`} />,
    ariaPosInSet,
    ariaSetSize: -1,
  };

  return (
    <Grid.Item>
      <Preview {...previewProps} />
    </Grid.Item>
  );
}
