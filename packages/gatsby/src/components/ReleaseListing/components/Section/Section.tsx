import React from "react";
import { Rule, Flex, Grid, TextDisplay } from "@gatsby-tv/components";
import { Browsable } from "@gatsby-tv/types";
import { ifExists, useTheme, useUniqueId } from "@gatsby-tv/utilities";
import { Link } from "@gatsby-tv/next";
import Preview from "@gatsby-tv/preview";

import { Info } from "@src/components/Info";
import { useListing } from "@src/utilities/listing";

export interface SectionProps {
  title: string;
  content: Browsable[];
}

export function Section(props: SectionProps): React.ReactElement | null {
  const { title, content } = props;
  const { groups, format, nochannel, avatar } = useListing();
  const id = useUniqueId("section");
  const theme = useTheme();

  const gridProps = {
    template: `repeat(${groups}, 1fr)`,
    justify: "stretch",
    center: ifExists(groups > 1),
    gap: theme.spacing[1.5],
    "aria-labelledby": id,
  };

  const PreviewsMarkup = content.map((item, index) => (
    <Preview
      key={`${item._id}.${index}`}
      format={format}
      content={item}
      info={<Info content={item} channel={!nochannel} avatar={avatar} />}
      link={<Link href={`/v/${item._id}`} />}
      ariaPosInSet={index + 1}
      ariaSetSize={content.length}
    />
  ));

  return content.length ? (
    <>
      <Rule />
      <Flex column gap={theme.spacing[1.5]}>
        <TextDisplay>{title}</TextDisplay>
        <Grid {...gridProps}>{PreviewsMarkup}</Grid>
      </Flex>
    </>
  ) : null;
}
