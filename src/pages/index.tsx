import React from "react";
import { Box, TextDisplay, TextBox } from "@gatsby-tv/components";
import { useTheme } from "@gatsby-tv/utilities";

import { Listing } from "@src/components/Listing";
import { useRecommendedFeed } from "@src/utilities/feeds";
import { usePageMargin } from "@src/utilities/use-page-margin";

export default function IndexPage(): React.ReactElement {
  const theme = useTheme();
  const feed = useRecommendedFeed();
  const margin = usePageMargin();

  return (
    <Box margin={[theme.spacing.none, margin]}>
      <TextBox margin={[theme.spacing.baseloose, theme.spacing.none]}>
        <TextDisplay font="large">Recommended</TextDisplay>
      </TextBox>
      <Listing grid generator={feed} />
    </Box>
  );
}
