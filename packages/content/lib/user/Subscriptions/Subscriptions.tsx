import React, { AriaAttributes } from "react";
import { Stream } from "@gatsby-tv/components";
import { PreviewFormat } from "@gatsby-tv/preview";
import { User } from "@gatsby-tv/types";

import { Video } from "@lib/video";
import { Section } from "@lib/listing/components/Section";
import { ListingContext, ListingContextType } from "@lib/utilities/listing";
import { useSubscriptionsFeed } from "@lib/utilities/use-subscriptions-feed";

import { Skeleton } from "./Subscriptions.skeleton";
import styles from "./Subscriptions.scss";

export interface SubscriptionsProps extends Partial<ListingContextType>, AriaAttributes {
  user?: User;
}

export function Subscriptions(props: SubscriptionsProps): React.ReactElement {
  const {
    id,
    user,
    preview = "column",
    info = "full",
    avatar,
    link,
    ...aria
  } = props;

  const { videos, loading, error, generator } = useSubscriptionsFeed(user?._id);

  if (!videos || error)
    return <Skeleton preview={preview} info={info} avatar={avatar} />;

  // Temporary accomodation, since releaseDate is a string when
  // being pulled from our testing API.
  const content = videos.map((video) => ({
    ...video,
    releaseDate: new Date(video.releaseDate),
  }));

  const today = new Date(
    new Date().setHours(0, 0, 0, 0) - new Date().getTimezoneOffset() * 60 * 1000
  );
  const yesterday = new Date(+today - 24 * 60 * 60 * 1000);
  const week = new Date(+today - 6 * 24 * 60 * 60 * 1000);
  const month = new Date(+today - 30 * 24 * 60 * 60 * 1000);

  const sections = [
    {
      title: "Today",
      content: content.filter((video) => video.releaseDate >= today),
    },
    {
      title: "Yesterday",
      content: content.filter(
        (video) => video.releaseDate < today && video.releaseDate >= yesterday
      ),
    },
    {
      title: "This Week",
      content: content.filter(
        (video) => video.releaseDate < yesterday && video.releaseDate >= week
      ),
    },
    {
      title: "This Month",
      content: content.filter(
        (video) => video.releaseDate < week && video.releaseDate >= month
      ),
    },
    {
      title: "Older",
      content: content.filter((video) => video.releaseDate < month),
    },
  ];

  const StreamMarkup = content.length ? (
    <Stream
      component={Section}
      generator={generator}
      loading={loading}
      data={sections.map((section, index) => ({ index, ...section }))}
    />
  ) : (
    <div className={styles.NoContentText}>No content to display...</div>
  );

  return (
    <ListingContext.Provider value={{ id, preview, info, avatar, link }}>
      <section
        id={id}
        className={styles.Listing}
        role="feed"
        aria-busy={loading}
        {...aria}
      >
        {StreamMarkup}
      </section>
    </ListingContext.Provider>
  );
}
