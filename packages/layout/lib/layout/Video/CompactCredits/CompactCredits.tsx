import { FC, ReactElement } from 'react';
import {
  AvatarCollation,
  Button,
  Icon,
  TextSubheading,
} from '@gatsby-tv/components';
import { Plus } from '@gatsby-tv/icons';
import {
  Value,
  useComponentWillMount,
  useMobileDetector,
} from '@gatsby-tv/utilities';
import { Video } from '@gatsby-tv/types';

import { User } from '@lib/layout/User';
import { LinkProps } from '@lib/types';

import styles from './CompactCredits.scss';

export interface CompactCreditsProps {
  content?: Video;
  link?: FC<LinkProps>;
}

export function CompactCredits(
  props: CompactCreditsProps
): ReactElement | null {
  const { content, link } = props;
  const mounted = useComponentWillMount();

  if (
    !mounted ||
    !content ||
    (!content.collaborators.length &&
      !content.contributors.length &&
      !content.sponsors.length)
  )
    return null;

  const CollaboratorsMarkup = content.collaborators.length
    ? content.collaborators.map((user) => (
        <User.Info
          key={`Collaborator.${user._id}`}
          user={user}
          blurb={Value(user.followers, 'follower') as string}
          link={link}
        />
      ))
    : null;

  const ContributorsMarkup = content.contributors.length
    ? content.contributors.map((user) => (
        <User.Info
          key={`Contributor.${user._id}`}
          user={user}
          blurb={Array.from(content.contributions[user._id]).join(', ')}
          link={link}
        />
      ))
    : null;

  const SponsorsMarkup = content.sponsors.length
    ? content.sponsors.map((user) => (
        <User.Info
          key={`Sponsor.${user._id}`}
          user={user}
          blurb={Value(user.followers, 'follower') as string}
          link={link}
        />
      ))
    : null;

  return (
    <>
      <div className={styles.Credits}>
        {CollaboratorsMarkup && (
          <div>
            <TextSubheading className={styles.Heading}>
              Collaborators
            </TextSubheading>
            <Button className={styles.Avatars} unstyled>
              <AvatarCollation
                avatars={content.collaborators
                  .slice(0, 4)
                  .map((user) => user.avatar)}
                size="smallest"
                spacing="tight"
              />
              <Icon src={Plus} size="smallest" />
            </Button>
          </div>
        )}
        {ContributorsMarkup && (
          <div>
            <TextSubheading className={styles.Heading}>
              Contributors
            </TextSubheading>
            <Button className={styles.Avatars} unstyled>
              <AvatarCollation
                avatars={content.contributors
                  .slice(0, 4)
                  .map((user) => user.avatar)}
                size="smallest"
                spacing="tight"
              />
              <Icon src={Plus} size="smallest" />
            </Button>
          </div>
        )}
        {SponsorsMarkup && (
          <div>
            <TextSubheading className={styles.Heading}>Sponsors</TextSubheading>
            <Button className={styles.Avatars} unstyled>
              <AvatarCollation
                avatars={content.sponsors
                  .slice(0, 4)
                  .map((user) => user.avatar)}
                size="smallest"
                spacing="tight"
              />
              <Icon src={Plus} size="smallest" />
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
