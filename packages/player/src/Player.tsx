import React, { forwardRef, Ref } from "react";
import { useMobileDetector } from "@gatsby-tv/utilities";

import { Desktop } from "@src/variants/Desktop";
import { Mobile } from "@src/variants/Mobile";
import { PlayerProps } from "@src/types";

export type { PlayerProps };

const PlayerBase = forwardRef<HTMLVideoElement, PlayerProps>(
  (props: PlayerProps, ref: Ref<HTMLVideoElement>) => {
    const mobile = useMobileDetector();
    return mobile ? (
      <Player.Mobile ref={ref} {...props} />
    ) : (
      <Player.Desktop ref={ref} {...props} />
    );
  }
);

export const Player = Object.assign(PlayerBase, {
  Desktop,
  Mobile,
  displayName: "Player",
});
