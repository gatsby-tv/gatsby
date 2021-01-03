import React from "react";
import { useTheme } from "@gatsby-tv/utilities";
import { TextDisplay, TextBox } from "@gatsby-tv/components";

import { Layout } from "@src/components/Layout";
import { Listing } from "@src/components/Listing";

export default function IndexPage(): React.ReactElement {
  const theme = useTheme();

  return (
    <Layout>
      <TextBox
        $marginTop={theme.spacing.baseLoose}
        $marginBottom={theme.spacing.baseLoose}
      >
        <TextDisplay $size="large">Recommended</TextDisplay>
      </TextBox>
      <Listing />
    </Layout>
  );
}
