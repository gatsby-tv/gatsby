import React from "react";
import {
  TextBox,
  Box,
  Optional,
  Rule,
  Flex,
  Grid,
  TextDisplay,
} from "@gatsby-tv/components";
import { Browsable } from "@gatsby-tv/types";
import { ifExists, useTheme, useUniqueId } from "@gatsby-tv/utilities";
import { Link } from "@gatsby-tv/next";
import Preview from "@gatsby-tv/preview";

import { Info } from "@src/components/Info";
import { useListing } from "@src/utilities/listing";
import { usePageMargin } from "@src/utilities/use-page-margin";

export interface SectionProps {
  title: string;
  content: Browsable[];
}

export function Section(props: SectionProps): React.ReactElement | null {
  const { title, content } = props;
  const { groups, format, nochannel, avatar } = useListing();
  const id = useUniqueId("section");
  const margin = usePageMargin();
  const theme = useTheme();

  const gridProps = {
    template: `repeat(${groups}, 1fr)`,
    justify: "stretch",
    center: groups > 1,
    gap: theme.spacing[1.5],
    "aria-labelledby": id,
  };

  const boxProps = {
    active: format === "column",
    $props: { margin },
  };

  const PreviewsMarkup = content.map((item, index) => (
    <Preview
      key={`${item._id}.${index}`}
      format={format}
      content={item}
      info={
        <Optional component={Box} {...boxProps}>
          <Info content={item} channel={!nochannel} avatar={avatar} />
        </Optional>
      }
      link={<Link href={`/v/${item._id}`} />}
      ariaPosInSet={index + 1}
      ariaSetSize={content.length}
    />
  ));

  return content.length ? (
    <>
      <Rule />
      <Flex column gap={theme.spacing[1.5]}>
        <TextBox margin={margin}>
          <TextDisplay id={id}>{title}</TextDisplay>
        </TextBox>
        <Grid as="section" {...gridProps}>
          {PreviewsMarkup}
        </Grid>
      </Flex>
    </>
  ) : null;
}
