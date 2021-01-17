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

import { Link, LinkProps } from "@src/components/Link";

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

  return (
    <Flex
      column
      rounded={theme.border.radius.smallest}
      padding={[
        theme.spacing.tight,
        theme.spacing.base,
        theme.spacing.extratight,
      ]}
      bg={theme.colors.background[3]}
      gap={theme.spacing.extratight}
      justify="space-between"
    >
      <TextSubheading>{category}</TextSubheading>
      <Flex gap={theme.spacing.base} align="center">
        <TextDisplay thin>{tag}</TextDisplay>
        <Flex.Item shrink={0}>
          <Icon src={ExtendRight} w={theme.icon.basesmall} />
        </Flex.Item>
      </Flex>
      <Link {...linkProps}>
        <Box absolute expand />
      </Link>
    </Flex>
  );
}
