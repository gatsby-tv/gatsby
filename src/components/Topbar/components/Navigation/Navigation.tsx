import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Flex, Icon, Tabs } from "@gatsby-tv/components";
import { GatsbyPlain } from "@gatsby-tv/icons";
import { useSelect, useTheme } from "@gatsby-tv/utilities";

import { useUser } from "@src/utilities/use-user";
import { Link } from "@src/components/Link";

export function Navigation(): React.ReactElement {
  const theme = useTheme();
  const user = useUser();
  const router = useRouter();

  let defaultTab: string | undefined = undefined;

  switch (router.pathname) {
    case "/d/browse":
      defaultTab = "browse";
      break;

    case "/d/subscriptions":
      defaultTab = "subscriptions";
      break;
  }

  const [tab, setTab] = useSelect(
    user ? ["subscriptions", "browse"] : ["browse"],
    defaultTab
  );

  return (
    <>
      <Link href="/" onClick={setTab}>
        <Icon
          src={GatsbyPlain}
          w={theme.icon.large}
          h={1}
          padding={[theme.spacing.none, theme.spacing.tight]}
        />
      </Link>
      <Tabs
        font="large"
        gap={theme.spacing.baseLoose}
        selection={tab}
        onSelect={setTab}
      >
        {user && (
          <NextLink href="/d/subscriptions" passHref>
            <Tabs.Link id="subscriptions">Subscriptions</Tabs.Link>
          </NextLink>
        )}
        <NextLink href="/d/browse" passHref>
          <Tabs.Link id="browse">Browse</Tabs.Link>
        </NextLink>
      </Tabs>
    </>
  );
}
