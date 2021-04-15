import React from "react";
import { Avatar, Icon, Optional, TextMeta, DiscreteSize } from "@gatsby-tv/components";
import { CheckmarkFill } from "@gatsby-tv/icons";
import { ChannelHandle, Value } from "@gatsby-tv/utilities";
import { Channel } from "@gatsby-tv/types";

import { LinkProps } from "@lib/types";

import { Skeleton } from "./Info.skeleton";
import styles from "./Info.scss";

export interface InfoProps {
  channel?: Channel;
  blurb?: string | string[];
  avatar?: DiscreteSize;
  link?: React.FC<LinkProps>;
}

export function Info(props: InfoProps): React.ReactElement {
  const { channel, blurb, avatar = "larger", link: Link } = props;

  if (!channel) return <Skeleton />;

  const VerifiedMarkup = channel.verified ? (
    <Icon className={styles.Verified} src={CheckmarkFill} size="smallest" />
  ) : null;

  const BlurbMarkup = !blurb ? null : typeof blurb === "string" ? (
    <TextMeta className={styles.InfoText}>{blurb}</TextMeta>
  ) : (
    <TextMeta.List className={styles.InfoText}>
      {blurb.map((item, index) => (
        <TextMeta key={`Info.Blurb.${index}`}>{item}</TextMeta>
      ))}
    </TextMeta.List>
  );

  return (
    <Optional component={Link} active={Boolean(Link)} $props={{ channel }}>
      <div className={styles.Info}>
        <Avatar className={styles.Avatar} src={channel.avatar} size={avatar} />
        <div className={styles.TextArea}>
          <Optional
            component="div"
            active={Boolean(VerifiedMarkup)}
            $props={{ className: styles.VerifiedContainer }}
          >
            <TextMeta className={styles.NameText}>{channel.name}</TextMeta>
            {VerifiedMarkup}
          </Optional>
          <TextMeta className={styles.InfoText}>
            {ChannelHandle(channel.handle)}
          </TextMeta>
          {BlurbMarkup}
        </div>
      </div>
    </Optional>
  );
}
