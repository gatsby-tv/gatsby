import React, { useState, useEffect, useCallback, RefObject } from "react";
import ReactDOM from "react-dom";
import { Box, Button, Icon } from "@gatsby-tv/components";
import { ExtendUp } from "@gatsby-tv/icons";
import { useTheme, useScroll } from "@gatsby-tv/utilities";

export interface ResetScrollProps {
  container: RefObject<HTMLElement>;
}

export function ResetScroll(props: ResetScrollProps): React.ReactPortal | null {
  const theme = useTheme();
  const { container } = props;
  const [active, setActive] = useState(false);
  const {
    scroll,
    setScroll,
    addScrollListener,
    removeScrollListener,
  } = useScroll();

  useEffect(() => {
    const handler = () => setActive(scroll.current !== 0);
    addScrollListener(handler);
    () => removeScrollListener(handler);
  }, [scroll]);

  const resetScroll = useCallback(() => setScroll(0), []);

  const boxProps = {
    absolute: true,
    bottom: theme.spacing[1.5],
    right: theme.spacing[1.5],
    zIndex: 2,
  };

  const buttonProps = {
    rounded: theme.border.radius.full,
    bg: theme.colors.inverted[5].darken(0.6).fade(0.2),
    highlight: theme.colors.inverted[5].darken(0.5).fade(0.2),
    tooltip: "Back to Top",
    onClick: resetScroll,
  };

  const ButtonMarkup = (
    <Box {...boxProps}>
      <Button {...buttonProps}>
        <Icon src={ExtendUp} w={theme.icon.smaller} />
      </Button>
    </Box>
  );

  return (
    (active &&
      container.current &&
      ReactDOM.createPortal(ButtonMarkup, container.current)) ||
    null
  );
}
