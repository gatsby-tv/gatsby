import React from "react";
import { useSession } from "next-auth/client";
import { TextBox, Flex, TextDisplay } from "@gatsby-tv/components";
import { User } from "@gatsby-tv/types";
import { useTheme } from "@gatsby-tv/utilities";
import { useSubscriptionsFeed } from "@gatsby-tv/next";

import { PageBody } from "@src/components/PageBody";
import { ReleaseListing } from "@src/components/ReleaseListing";
import { usePageMargin } from "@src/utilities/use-page-margin";

export default function SubscriptionsPage(): React.ReactElement {
  const [session] = useSession();
  const { videos, ...subscriptions } = useSubscriptionsFeed(
    (session?.user as User | undefined)?._id
  );
  const theme = useTheme();
  const margin = usePageMargin();

  const ReleaseListingMarkup = videos ? (
    <ReleaseListing
      groups={margin ? 1 : 2}
      videos={videos}
      avatar={theme.avatar.small}
      {...subscriptions}
    />
  ) : (
    <ReleaseListing.Skeleton
      groups={margin ? 1 : 2}
      avatar={theme.avatar.small}
    />
  );

  return (
    <PageBody>
      <Flex column gap={theme.spacing[1.5]}>
        <TextBox margin={margin}>
          <TextDisplay size="large">Subscriptions</TextDisplay>
        </TextBox>
        {ReleaseListingMarkup}
      </Flex>
    </PageBody>
  );
}
