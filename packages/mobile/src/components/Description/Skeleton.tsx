import React from "react";
import { Flex, Avatar, Rule, TextPlaceholder } from "@gatsby-tv/components";
import { useTheme } from "@gatsby-tv/utilities";

export function Skeleton(): React.ReactElement {
  const theme = useTheme();

  const AvatarsMarkup = [...Array(5)].map((_, index) => (
    <Avatar key={`skeleton.${index}`} size={theme.icon.largest} />
  ));

  return (
    <>
      <Flex column gap={theme.spacing[1]}>
        <Flex column w={1} gap={theme.spacing[1]}>
          <TextPlaceholder w={0.4} heading font={theme.font[3]} />
          <TextPlaceholder w={0.2} font={theme.font[3]} />
        </Flex>
        <Flex gap={theme.spacing[1.5]}>
          {AvatarsMarkup}
        </Flex>
      </Flex>
      <Rule margin={[theme.spacing[1], theme.spacing[0], theme.spacing[1.5]]} />
    </>
  );
}
