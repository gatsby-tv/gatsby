import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { Icon, Tabs } from "@gatsby-tv/components";
import { GatsbyPlain, Subscribe, Browse } from "@gatsby-tv/icons";
import { useSelect } from "@gatsby-tv/utilities";

import { Link } from "@src/components/Link";

import styles from "./Navigation.module.scss";

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
  const [session, loading] = useSession();
  const router = useRouter();
  const defaultTab = getCurrentTab(router.pathname);
  const [tab, setTab] = useSelect(
    session ? ["subscriptions", "browse"] : ["browse"],
    defaultTab
  );

  return (
    <>
      <Link href="/" $props={{ className: styles.HomeLink, onClick: setTab }}>
        <Icon className={styles.Logo} src={GatsbyPlain} size="larger" />
      </Link>
      <Tabs
        className={styles.Tabs}
        gap="loose"
        selection={tab}
        onSelect={setTab}
      >
        {session && (
          <Link
            component={Tabs.Link}
            href="/d/subscriptions"
            $props={{ option: "subscriptions" }}
          >
            Subscriptions
          </Link>
        )}
        <Link
          component={Tabs.Link}
          href="/d/browse"
          $props={{ option: "browse" }}
        >
          Browse
        </Link>
      </Tabs>
    </>
  );
}
