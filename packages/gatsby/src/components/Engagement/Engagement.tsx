import React from "react";
import { Button, Icon } from "@gatsby-tv/components";
import { IconSource } from "@gatsby-tv/components/dist/types";
import { Subscribe, Follow, Promote, Donate, Tip, Misc } from "@gatsby-tv/icons";
import { useTheme } from "@gatsby-tv/utilities";

export interface EngagementProps {
  type: "subscribe" | "follow" | "promote" | "donate" | "tip" | "misc";
  shadow?: boolean;
}

export function Engagement(props: EngagementProps): React.ReactElement {
  const theme = useTheme();

  let icon: IconSource;
  let tooltip: string;

  switch (props.type) {
    case "subscribe":
      icon = Subscribe;
      tooltip = "Subscribe";
      break;

    case "follow":
      icon = Follow;
      tooltip = "Follow";
      break;

    case "promote":
      icon = Promote;
      tooltip = "Promote";
      break;

    case "donate":
      icon = Donate;
      tooltip = "Donate";
      break;

    case "tip":
      icon = Tip;
      tooltip = "Tip";
      break;

    case "misc":
      icon = Misc;
      tooltip = "Misc";
      break;
  }

  const buttonProps = {
    animate: true,
    shadow: props.shadow,
    rounded: theme.border.radius.full,
    padding: "0.8rem",
    bg: theme.colors.inverted[5].darken(0.1),
    fg: theme.colors.background[0],
    highlight: [theme.colors.inverted[5], theme.colors.background[0]],
    tooltip,
  };

  return (
    <Button {...buttonProps}>
      <Icon src={icon} w={theme.icon.base} />
    </Button>
  );
}
