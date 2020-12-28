import React from "react";
import { Flex, Box, Image, Avatar, TextMeta } from "@gatsby-tv/components";
import { Time, useTheme, useIpfsContent } from "@gatsby-tv/utilities";

export interface PreviewProps {
  compact?: boolean;
  thumbnail: string;
  avatar: string;
  title: string;
  channel: string;
  views: string;
  age: string;
  duration: number;
}

export function Preview(props: PreviewProps) {
  const theme = useTheme();
  const avatar = useIpfsContent(props.avatar, "image/jpg");
  const thumbnail = useIpfsContent(props.thumbnail, "image/png");

  const overlayMarkup = (
    <Box
      $absolute
      $bottom={theme.spacing.extraTight}
      $right={theme.spacing.extraTight}
    >
      <Box
        $bg={theme.colors.black.fade(0.1)}
        $paddingLeft={theme.spacing.extraTight}
        $paddingRight={theme.spacing.extraTight}
      >
        <TextMeta $bold $size="small">
          {Time(props.duration)}
        </TextMeta>
      </Box>
    </Box>
  );

  const MetaContainer = ({ children }: { children: React.ReactNode }) =>
    props.compact ? (
      <>{children}</>
    ) : (
      <Flex $gap={theme.spacing.baseTight}>
        <Flex.Item $shrink={0}>
          <Avatar src={avatar} $size="small" />
        </Flex.Item>
        {children}
      </Flex>
    );

  return (
    <Flex $column={!props.compact} $gap={theme.spacing.tight}>
      <Image
        src={thumbnail}
        $overlay={overlayMarkup}
        $rounded={theme.border.radius.smallest}
        $aspectRatio={0.5625}
      />
      <Flex.Item $minWidth="20rem">
        <MetaContainer>
          <Flex $column $gap={theme.spacing.extraTight}>
            <TextMeta $bold $tooltip $clamp={2}>
              {props.title}
            </TextMeta>
            <Flex $column>
              <TextMeta.Link $bold $size="small">
                {props.channel}
              </TextMeta.Link>
              <TextMeta.List $bold $subdued $size="small">
                <TextMeta>{props.views}</TextMeta>
                <TextMeta>{props.age}</TextMeta>
              </TextMeta.List>
            </Flex>
          </Flex>
        </MetaContainer>
      </Flex.Item>
    </Flex>
  );
}
