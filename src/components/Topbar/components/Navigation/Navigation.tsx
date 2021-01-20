import React from "react";
import NextLink from "next/link";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { Flex, Icon, Tabs } from "@gatsby-tv/components";
import { GatsbyPlain, Browse, Subscribe } from "@gatsby-tv/icons";
import { useSelect, useTheme, useFrame } from "@gatsby-tv/utilities";

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
  const { screen } = useFrame();
  const [session, loading] = useSession();
  const router = useRouter();

  const defaultTab = getCurrentTab(router.pathname);

  const [tab, setTab] = useSelect(
    session ? ["subscriptions", "browse"] : ["browse"],
    defaultTab
  );

  const tabsMarkup =
    screen !== "desktop" ? (
      <>
        {session && (
          <NextLink href="/d/subscriptions" passHref>
            <Tabs.Link id="subscriptions">
              <Icon src={Subscribe} w={theme.icon.basesmall} />
            </Tabs.Link>
          </NextLink>
        )}
        <NextLink href="/d/browse" passHref>
          <Tabs.Link id="browse">
            <Icon src={Browse} w={theme.icon.basesmall} />
          </Tabs.Link>
        </NextLink>
      </>
    ) : (
      <>
        {session && (
          <NextLink href="/d/subscriptions" passHref>
            <Tabs.Link id="subscriptions">Subscriptions</Tabs.Link>
          </NextLink>
        )}
        <NextLink href="/d/browse" passHref>
          <Tabs.Link id="browse">Browse</Tabs.Link>
        </NextLink>
      </>
    );

  return (
    <>
      <Link href="/" onClick={setTab}>
        <Icon
          src={GatsbyPlain}
          w={screen !== "desktop" ? theme.icon.baselarge : theme.icon.large}
          h={1}
          padding={[theme.spacing.none, theme.spacing.tight]}
        />
      </Link>
      <Tabs
        font="large"
        gap={theme.spacing.baseloose}
        selection={tab}
        onSelect={setTab}
      >
        {tabsMarkup}
      </Tabs>
    </>
  );
}
