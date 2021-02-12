import { useEffect } from "react";

import { EventHandler } from "@lib/types";

export interface EventListenerProps {
  event: string;
  handler: EventHandler;
  capture?: boolean;
  doc?: boolean;
}

export function EventListener(props: EventListenerProps): null {
  useEffect(() => {
    const target = props.doc ? document : window;

    target.addEventListener(
      props.event as any,
      props.handler as any,
      props.capture ?? false
    );
    return () =>
      target.removeEventListener(
        props.event as any,
        props.handler as any,
        props.capture ?? false
      );
  });

  return null;
}
