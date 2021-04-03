import React, { useCallback } from "react";
import { ifExists, useModalCallback } from "@gatsby-tv/utilities";

import { EventHandler } from "@lib/types";
import { Box } from "@lib/components/Box";
import { Optional } from "@lib/components/Optional";
import { Portal } from "@lib/components/Portal";
import { EventListener } from "@lib/components/EventListener";

import { Overlay } from "./components";

export interface ModalProps {
  children?: React.ReactNode;
  id?: string;
  fullscreen?: boolean;
  active?: boolean;
  zIndex?: number;
  onExit?: () => void;
}

export function Modal(props: ModalProps): React.ReactElement | null {
  const {
    children,
    id,
    fullscreen,
    active,
    zIndex,
    onExit = () => undefined,
  } = props;

  useModalCallback(onExit, [onExit]);

  const onKeyDown = useCallback(
    (event: any) => {
      if (event.code === "Escape") {
        onExit();
      }
    },
    [onExit]
  );

  const optionalProps = {
    active: ifExists(fullscreen),
    $props: { zIndex },
  };

  return active ? (
    <Portal id={id ? `modal-${id}` : "modal"}>
      <Optional component={Overlay} {...optionalProps}>
        <Box onPointerDown={(event) => event.stopPropagation()}>{children}</Box>
      </Optional>
      <EventListener event="keydown" handler={onKeyDown} />
    </Portal>
  ) : null;
}
