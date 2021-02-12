import React, { useRef, useState, useEffect } from "react";

export interface LabelledProps {
  children?: React.ReactNode;
  as?: string;
  component: React.FC<any>;
  $props?: any;
}

export function Labelled(props: LabelledProps): React.ReactElement {
  const { children, as: tag, component: Component, $props = {} } = props;
  const ref = useRef<HTMLElement>(null);
  const [label, setLabel] = useState<string | undefined>(undefined);
  const [descriptions, setDescriptions] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (!ref.current) return;

    const labelNode = ref.current.querySelector("[data-label]");
    const descNodes = ref.current.querySelectorAll("[data-description]");

    setLabel(labelNode?.id);
    setDescriptions(
      Array.from(descNodes)
        .map((element) => element.id)
        .join(" ") || undefined
    );
  }, []);

  const componentProps = {
    ref,
    "aria-labelledby": label,
    "aria-describedby": descriptions,
    ...$props,
  };

  return (
    <Component as={tag} {...componentProps}>
      {children}
    </Component>
  );
}
