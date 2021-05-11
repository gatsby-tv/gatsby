import React, { useState } from "react";
import { Rule, Tabs, TextDisplay } from "@gatsby-tv/components";
import { useUniqueId } from "@gatsby-tv/utilities";
import { Listing } from "@gatsby-tv/content";

import { PageBody } from "@src/components/PageBody";
import { Link } from "@src/components/Link";

import styles from "@src/styles/Browse.module.scss";

export default function BrowsePage(): React.ReactElement {
  const [tab, setTab] = useState("popular");
  const Content = tab === "popular" ? Listing.Recommended : Listing.New;
  const popularId = useUniqueId("tab");
  const newId = useUniqueId("tab");
  const panelId = useUniqueId("panel");
  const panelLabel = tab === "popular" ? popularId : newId;

  return (
    <PageBody>
      <TextDisplay className={styles.Heading} size="large">
        Browse
      </TextDisplay>
      <Tabs className={styles.Tabs} selection={tab} onSelect={setTab}>
        <Tabs.Item id={popularId} option="popular" aria-controls={panelId}>
          Popular
        </Tabs.Item>
        <Tabs.Item id={newId} option="new" aria-controls={panelId}>
          New
        </Tabs.Item>
      </Tabs>
      <Rule className={styles.Rule} />
      <Content
        id={panelId}
        link={Link.Content}
        avatar="base"
        aria-labelledby={panelLabel}
      />
    </PageBody>
  );
}
