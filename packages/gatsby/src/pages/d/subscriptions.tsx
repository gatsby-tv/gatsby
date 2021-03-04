import React from "react";
import { useSession } from "next-auth/client";
import { Box, Flex, TextDisplay } from "@gatsby-tv/components";
import { useTheme, useBreakpoints } from "@gatsby-tv/utilities";
import { User } from "@gatsby-tv/types";

import { PageBody } from "@src/components/PageBody";
import { ReleaseListing } from "@src/components/ReleaseListing";
import { useSubscriptionsFeed } from "@src/utilities/use-subscriptions-feed";

export default function SubscriptionsPage(): React.ReactElement {
  const [session] = useSession();
  const { videos, ...subscriptions } = useSubscriptionsFeed(
    (session?.user as User | undefined)?._id
  );
  const theme = useTheme();

  const groups = useBreakpoints(
    {
      3: "(max-width: 1200px)",
      4: "(min-width: 1201px)",
    },
    4
  );

  const ReleaseListingMarkup = videos ? (
    <ReleaseListing groups={groups} videos={videos} {...subscriptions} />
  ) : (
    <ReleaseListing.Skeleton groups={groups} />
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
