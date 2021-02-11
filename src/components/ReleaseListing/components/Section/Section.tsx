import React from "react";
import { Rule, Flex, Grid, TextDisplay } from "@gatsby-tv/components";
import { Browsable } from "@gatsby-tv/types";
import { ifExists, useTheme } from "@gatsby-tv/utilities";

import { useListing } from "@src/utilities/listing";
import { Preview } from "@src/components/Preview";

export interface SectionProps {
  title: string;
  content: Browsable[];
}

export function Section(props: SectionProps): React.ReactElement | null {
  const { title, content } = props;
  const { groups, format } = useListing();
  const theme = useTheme();

  const gridProps = {
    template: `repeat(${groups}, 1fr)`,
    justify: "stretch",
    center: ifExists(groups > 1),
    gap: theme.spacing[1.5],
  };

  const PreviewsMarkup = content.map((item, index) => (
    <Preview
      key={`${item._id}.${index}`}
      content={item}
      avatar={theme.avatar.small}
      format={format}
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
