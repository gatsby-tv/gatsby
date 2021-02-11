import React from "react";
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

export interface NavigationProps {
  session?: boolean;
}

export function Navigation(props: NavigationProps): React.ReactElement {
  const { session } = props;
  const theme = useTheme();
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
    <Link href="/" $props={{ onClick: setTab }}>
      <Icon {...logoProps} />
    </Link>
  );

  const SubscriptionsMarkup = session ? (
    <Link
      component={Tabs.Link}
      href="/d/subscriptions"
      $props={{ option: "subscriptions" }}
    >
      Subscriptions
    </Link>
  ) : null;

  const BrowseMarkup = (
    <Link
      component={Tabs.Link}
      href="/d/browse"
      $props={{ option: "browse" }}
    >
      Browse
    </Link>
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
