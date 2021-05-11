import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { Button, Icon, Tabs, Menu, Rule } from "@gatsby-tv/components";
import { GatsbyPlain, Subscribe, Browse, Misc } from "@gatsby-tv/icons";
import { useFrame, useMenu } from "@gatsby-tv/utilities";

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
  const { screen } = useFrame();
  const [session, loading] = useSession();
  const router = useRouter();
  const defaultTab = getCurrentTab(router.pathname);
  const menu = useMenu<HTMLButtonElement>();
  const [tab, setTab] = useState<string | undefined>(defaultTab);

  return (
    <>
      <Link href="/" $props={{ className: styles.HomeLink, onClick: setTab }}>
        <Icon className={styles.Logo} src={GatsbyPlain} size="larger" />
      </Link>
      <Tabs
        className={styles.Tabs}
        itemClass={styles.Tab}
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
            {screen.width < 650 ? <Icon src={Subscribe} /> : "Subscriptions"}
          </Link>
        )}
        <Link
          component={Tabs.Link}
          href="/d/browse"
          $props={{ option: "browse" }}
        >
          {screen.width < 650 ? <Icon src={Browse} /> : "Browse"}
        </Link>
      </Tabs>
      <Button
        ref={menu.ref}
        className={styles.Misc}
        animate
        icon={Misc}
        size="small"
        onClick={menu.toggle}
      />
      <Menu
        for={menu.ref}
        className={styles.Menu}
        placement="bottom-start"
        offset={[0, 7]}
        active={menu.active}
        onExit={menu.deactivate}
      >
        <div className={styles.MenuSection}>
          Information
        </div>
        <Link href="/p/about">
          <div className={styles.MenuItem}>
            About
          </div>
        </Link>
        <Link href="/p/creators">
          <div className={styles.MenuItem}>
            Creators
          </div>
        </Link>
        <Link href="/p/sponsors">
          <div className={styles.MenuItem}>
            Sponsors
          </div>
        </Link>
        <Link href="/p/developers">
          <div className={styles.MenuItem}>
            Developers
          </div>
        </Link>
        <Rule spacing="extratight" />
        <div className={styles.MenuSection}>
          Legal
        </div>
        <Link href="/p/terms">
          <div className={styles.MenuItem}>
            Terms of Service
          </div>
        </Link>
        <Rule spacing="extratight" />
        <div className={styles.MenuSection}>
          Help
        </div>
        <Link href="https://github.com/gatsby-tv/gatsby/issues">
          <div className={styles.MenuItem}>
            Submit an Issue
          </div>
        </Link>
      </Menu>
    </>
  );
}
