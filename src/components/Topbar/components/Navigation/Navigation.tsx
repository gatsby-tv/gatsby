import React from "react";
import NextLink from "next/link";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { Icon, Tabs } from "@gatsby-tv/components";
import { GatsbyPlain } from "@gatsby-tv/icons";
import { useSelect, useTheme } from "@gatsby-tv/utilities";

import { Link } from "@src/components/Link";

function getCurrentTab(route: string): string | undefined {
  switch (route) {
    case "/d/browse":
      return "browse";
    case "/d/subscriptions":
      return "subscriptions";
    default:
      return;
  }
}

export function Navigation(): React.ReactElement {
  const theme = useTheme();
  const [session] = useSession();
  const router = useRouter();

  const defaultTab = getCurrentTab(router.pathname);

  const [tab, setTab] = useSelect(
    session ? ["subscriptions", "browse"] : ["browse"],
    defaultTab
  );

  const logoProps = {
    src: GatsbyPlain,
    w: theme.icon.larger,
    h: 1,
    padding: [theme.spacing[0], theme.spacing[1]],
  };

  const tabsProps = {
    font: "large",
    gap: theme.spacing[2],
    selection: tab,
    onSelect: setTab,
  };

  const LogoMarkup = (
    <Link href="/" onClick={setTab}>
      <Icon {...logoProps} />
    </Link>
  );

  const SubscriptionsMarkup = session ? (
    <NextLink href="/d/subscriptions" passHref>
      <Tabs.Link id="subscriptions">Subscriptions</Tabs.Link>
    </NextLink>
  ) : null;

  const BrowseMarkup = (
    <NextLink href="/d/browse" passHref>
      <Tabs.Link id="browse">Browse</Tabs.Link>
    </NextLink>
  );

  return (
    <>
      {LogoMarkup}
      <Tabs {...tabsProps}>
        {SubscriptionsMarkup}
        {BrowseMarkup}
      </Tabs>
    </>
  );
}
