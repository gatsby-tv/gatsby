import React from "react";
import { useTheme } from "@gatsby-tv/utilities";
import { TextDisplay, TextBox } from "@gatsby-tv/components";

import { Layout } from "@src/components/Layout";
import { Listing } from "@src/components/Listing";

export default function IndexPage() {
  const theme = useTheme();

  return (
    <Layout>
      <TextBox
        $marginTop={theme.spacing.loose}
        $marginBottom={theme.spacing.loose}
      >
        <TextDisplay $size="large">Recommended</TextDisplay>
      </TextBox>
      <Listing />
    </Layout>
  );
}
