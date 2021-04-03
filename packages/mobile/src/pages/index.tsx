import React, { useEffect } from "react";
import Head from "next/head";
import { TextBox, Flex, TextDisplay, Rule } from "@gatsby-tv/components";
import { ifExists, useTheme, useUniqueId } from "@gatsby-tv/utilities";
import { Link, useRecommendedFeed } from "@gatsby-tv/next";
import Preview from "@gatsby-tv/preview";

import { PageBody } from "@src/components/PageBody";
import { Info } from "@src/components/Info";
import { Listing } from "@src/components/Listing";
import { usePageMargin } from "@src/utilities/use-page-margin";

export default function IndexPage(): React.ReactElement {
  const theme = useTheme();
  const recommendedId = useUniqueId("section");
  const { content: recommended, ...recommendedProps } = useRecommendedFeed();
  const margin = usePageMargin();

  const HeaderMarkup = (
    <Head>
      <title>Gatsby</title>
    </Head>
  );

  const ListingMarkup = recommended ? (
    <Listing
      content={recommended}
      groups={margin ? 1 : 2}
      avatar={theme.avatar.smaller}
      ariaLabelledBy={recommendedId}
      {...recommendedProps}
    />
  ) : (
    <Listing.Skeleton groups={margin ? 1 : 2} avatar={theme.avatar.smaller} />
  );

  return (
    <>
      {HeaderMarkup}
      <PageBody>
        <Flex column gap={theme.spacing[1.5]}>
          <TextBox margin={margin}>
            <TextDisplay id={recommendedId} size="large">
              Recommended
            </TextDisplay>
          </TextBox>
          <Rule />
          {ListingMarkup}
        </Flex>
      </PageBody>
    </>
  );
}
