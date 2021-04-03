import React from "react";
import {
  Box,
  Flex,
  TextDisplay,
  TextSubheading,
  Icon,
} from "@gatsby-tv/components";
import { useTheme } from "@gatsby-tv/utilities";
import { ExtendRight } from "@gatsby-tv/icons";
import { Topic, Genre } from "@gatsby-tv/types";
import { Link, LinkProps } from "@gatsby-tv/next";

type TopicProps = { topic: Topic } & LinkProps;
type GenreProps = { genre: Genre } & LinkProps;

export type CategoryLinkProps = TopicProps | GenreProps;

function isTopicProps(props: CategoryLinkProps): props is TopicProps {
  return (props as TopicProps).topic !== undefined;
}

function parseTopicProps(props: TopicProps): ["topic", Topic, LinkProps] {
  const { topic, ...linkProps } = props;
  return ["topic", topic, linkProps];
}

function parseGenreProps(props: GenreProps): ["genre", Genre, LinkProps] {
  const { genre, ...linkProps } = props;
  return ["genre", genre, linkProps];
}

export function CategoryLink(props: CategoryLinkProps): React.ReactElement {
  const theme = useTheme();
  const [category, tag, linkProps] = isTopicProps(props)
    ? parseTopicProps(props)
    : parseGenreProps(props);

  const flexProps = {
    column: true,
    rounded: theme.border.radius.smallest,
    padding: [theme.spacing[1], theme.spacing[1.5], theme.spacing[0.5]],
    bg: theme.colors.background[3],
    gap: theme.spacing[0.5],
    justify: "space-between",
  };

  const LinkMarkup = (
    <Link {...linkProps}>
      <Box absolute expand />
    </Link>
  );

  return (
    <Flex {...flexProps}>
      <TextSubheading>{category}</TextSubheading>
      <Flex gap={theme.spacing[1.5]} align="center">
        <TextDisplay size="small">{tag}</TextDisplay>
        <Flex.Item shrink={0}>
          <Icon src={ExtendRight} w={theme.icon.small} />
        </Flex.Item>
      </Flex>
      {LinkMarkup}
    </Flex>
  );
}
