import React from "react";
import { useSession } from "next-auth/client";
import { Box, Flex, TextDisplay } from "@gatsby-tv/components";
import { User } from "@gatsby-tv/types";
import { useFrame, useTheme } from "@gatsby-tv/utilities";
import { useSubscriptionsFeed } from "@gatsby-tv/next";

import { PageBody } from "@src/components/PageBody";
import { ReleaseListing } from "@src/components/ReleaseListing";

export default function SubscriptionsPage(): React.ReactElement {
  const [session] = useSession();
  const { videos, ...subscriptions } = useSubscriptionsFeed(
    (session?.user as User | undefined)?._id
  );
  const theme = useTheme();
  const { screen } = useFrame();

  const groups = screen.width < 1200 ? 3 : 4;

  const ReleaseListingMarkup = videos ? (
    <ReleaseListing
      groups={groups}
      videos={videos}
      avatar={theme.avatar.small}
      {...subscriptions}
    />
  ) : (
    <ReleaseListing.Skeleton groups={groups} avatar={theme.avatar.small} />
  );

  return (
    <PageBody>
      <Flex column gap={theme.spacing[3]}>
        <TextDisplay size="large">Subscriptions</TextDisplay>
        {ReleaseListingMarkup}
      </Flex>
    </PageBody>
  );
}
