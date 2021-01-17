import React from "react";
import NextLink from "next/link";
import { Flex, Box, TextMeta, Optional, Icon } from "@gatsby-tv/components";
import { CheckmarkFill } from "@gatsby-tv/icons";
import { Value, ReleaseDate, ifExists, useTheme } from "@gatsby-tv/utilities";

export interface InfoProps {
  name: string;
  handle: string;
  views: number;
  releaseDate: Date;
  verified?: boolean;
}

export function Info(props: InfoProps) {
  const theme = useTheme();

  const verifiedMarkup = props.verified ? (
    <Icon
      src={CheckmarkFill}
      w={theme.icon.extrasmall}
      fg={theme.colors.font.subdued}
    />
  ) : null;

  return (
    <Flex column box={theme.spacing.none}>
      <Optional
        active={ifExists(props.verified)}
        component={Flex}
        $props={{ gap: theme.spacing.extratight }}
      >
        <Box zIndex={2}>
          <NextLink href={`/${props.handle}`} passHref>
            <TextMeta.Link bold font="small">
              {props.name}
            </TextMeta.Link>
          </NextLink>
        </Box>
        {verifiedMarkup}
      </Optional>
      <TextMeta.List subdued>
        <TextMeta bold font="small">
          {Value(props.views, "view")}
        </TextMeta>
        <TextMeta bold font="small">
          {ReleaseDate(props.releaseDate)}
        </TextMeta>
      </TextMeta.List>
    </Flex>
  );
}
