import React from "react";
import {
  Avatar,
  Optional,
  Icon,
  TextMeta,
  DiscreteSize,
} from "@gatsby-tv/components";
import { CheckmarkFill } from "@gatsby-tv/icons";
import {
  classNames,
  Value,
  ReleaseDate,
  useUniqueId,
} from "@gatsby-tv/utilities";
import {
  Browsable,
  Collection,
  Season,
  isVideo,
  isEpisodicVideo,
  isSeasonedShow,
} from "@gatsby-tv/types";

import { VideoInfoFormat, LinkProps } from "@lib/types";

import { Skeleton } from "./Info.skeleton";
import styles from "./Info.scss";

function getShowInfo(
  content: Browsable
): [number | undefined, number | undefined] {
  if (!isEpisodicVideo(content)) return [undefined, undefined];

  const isEpisode = (episode: Browsable) => content._id === episode._id;
  const hasEpisode = (season: Season) => season.episodes.some(isEpisode);

  if (isSeasonedShow(content.show)) {
    const season = content.show.seasons.findIndex(hasEpisode);
    const episode = content.show.seasons[season].episodes.findIndex(isEpisode);
    return [season + 1, episode + 1];
  } else {
    const episode = content.show.episodes.findIndex(isEpisode);
    return [undefined, episode + 1];
  }
}

export interface InfoProps {
  content?: Browsable;
  format?: VideoInfoFormat;
  avatar?: DiscreteSize;
  link?: React.FC<LinkProps>;
}

export function Info(props: InfoProps): React.ReactElement {
  const { content, format = "full", avatar, link: Link } = props;
  const seasonId = useUniqueId("content-season");
  const episodeId = useUniqueId("content-episode");
  const titleId = useUniqueId("content-title");
  const channelId = useUniqueId("content-channel");
  const viewsId = useUniqueId("content-views");
  const releaseId = useUniqueId("content-release");

  if (!content) return <Skeleton format={format} avatar={avatar} />;

  const channel = format !== "nochannel" ? content.channel : undefined;
  const [season, episode] = getShowInfo(content);
  const date = new Date(
    isVideo(content)
      ? content.releaseDate
      : (content as Collection).creationDate
  );

  const EpisodeMarkup =
    season || episode ? (
      <Optional component={TextMeta.List} active={Boolean(season)}>
        {season && (
          <TextMeta
            id={seasonId}
            className={styles.ShowText}
            data-description
          >{`Season ${season}`}</TextMeta>
        )}
        <TextMeta
          id={episodeId}
          className={styles.ShowText}
          data-description
        >{`Episode ${episode}`}</TextMeta>
      </Optional>
    ) : null;

  const AvatarMarkup =
    avatar && channel ? (
      <Optional
        component={Link}
        active={Boolean(Link)}
        $props={{ channel, className: styles.AvatarLink }}
      >
        <Avatar
          className={classNames(!Link && styles.Avatar)}
          src={channel.avatar}
          size={avatar}
        />
      </Optional>
    ) : null;

  const VerifiedMarkup = channel?.verified ? (
    <Icon className={styles.Verified} src={CheckmarkFill} size="smallest" />
  ) : null;

  const ChannelMarkup = channel ? (
    <Optional
      component="div"
      active={Boolean(VerifiedMarkup)}
      $props={{ className: styles.VerifiedContainer }}
    >
      <Optional
        component={Link}
        active={Boolean(Link)}
        $props={{ channel, className: styles.ChannelLink }}
      >
        <TextMeta.Link
          id={channelId}
          className={styles.ChannelText}
          data-description
        >
          {channel.name}
        </TextMeta.Link>
      </Optional>
      {VerifiedMarkup}
    </Optional>
  ) : null;

  const StatsMarkup =
    format !== "nostats" ? (
      <TextMeta.List>
        <TextMeta.Data
          id={viewsId}
          className={styles.StatText}
          value={content.views}
          data-description
        >
          {Value(content.views, "view")}
        </TextMeta.Data>
        <TextMeta.Time
          id={releaseId}
          className={styles.StatText}
          date={date}
          data-description
        >
          {ReleaseDate(date)}
        </TextMeta.Time>
      </TextMeta.List>
    ) : null;

  return (
    <Optional
      component="div"
      active={Boolean(AvatarMarkup)}
      $props={{ className: styles.AvatarContainer }}
    >
      {AvatarMarkup}
      <div className={styles.Info}>
        {EpisodeMarkup}
        <TextMeta
          id={titleId}
          className={styles.TitleText}
          clamp={2}
          data-label
        >
          {content.title}
        </TextMeta>
        {ChannelMarkup}
        {StatsMarkup}
      </div>
    </Optional>
  );
}
