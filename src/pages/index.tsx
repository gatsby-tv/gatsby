import React, { useEffect } from "react";
import Head from "next/head";
import { useSession } from "next-auth/client";
import { Rule, TextDisplay } from "@gatsby-tv/components";
import { Channel, Listing } from "@gatsby-tv/content";
import { useUniqueId } from "@gatsby-tv/utilities";
import { User } from "@gatsby-tv/types";

import { PageBody } from "@src/components/PageBody";
import { Link } from "@src/components/Link";
import { useChannelModal } from "@src/utilities/channel-modal";
import styles from "@src/styles/Home.module.scss";

export default function IndexPage(): React.ReactElement {
  const recommendedId = useUniqueId("recommended");
  const recommendedLabel = useUniqueId("heading");
  const [, setChannel] = useChannelModal();
  const [session, loading] = useSession();

  const HeaderMarkup = (
    <Head>
      <title>Gatsby</title>
    </Head>
  );

  return (
    <>
      {HeaderMarkup}
      <PageBody>
        <Channel.Carousel onSelect={setChannel} />
        <Rule className={styles.Rule} />
        <TextDisplay id={recommendedLabel} className={styles.Heading}>
          Recommended
        </TextDisplay>
        <Listing.Recommended
          id={recommendedId}
          user={session?.user as User | undefined}
          link={Link.Content}
          avatar="base"
          aria-labelledby={recommendedLabel}
        />
      </PageBody>
    </>
  );
}
