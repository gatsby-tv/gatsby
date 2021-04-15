import React, { useCallback } from "react";
import { ifExists, classNames, useModalCallback } from "@gatsby-tv/utilities";

import { Optional } from "@lib/components/Optional";
import { Portal } from "@lib/components/Portal";
import { EventListener } from "@lib/components/EventListener";
import { EventHandler } from "@lib/types";

import styles from "./Modal.scss";

export interface ModalProps {
  children?: React.ReactNode;
  id?: string;
  className?: string;
  overlay?: boolean;
  active?: boolean;
  zIndex?: number;
  onExit?: () => void;
}

export function Modal(props: ModalProps): React.ReactElement | null {
  const {
    children,
    id,
    className,
    overlay,
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

  const onPointerDown = (event: any) => event.stopPropagation();

  const classes = classNames(className, styles.Modal);

  return active ? (
    <Portal id={id ? `modal-${id}` : "modal"}>
      <Optional
        component="div"
        active={overlay}
        $props={{
          className: styles.Overlay,
          style: ifExists(zIndex, { zIndex }),
        }}
      >
        <div className={classes} onPointerDown={onPointerDown}>
          {children}
        </div>
      </Optional>
      <EventListener event="keydown" handler={onKeyDown} />
    </Portal>
  ) : null;
}
