import {
  useRef,
  useState,
  useEffect,
  createElement,
  FC,
  ReactNode,
  ReactElement,
} from 'react';

export interface LabelledProps {
  children?: ReactNode;
  component: FC<any> | string;
  $props?: any;
}

export function Labelled(props: LabelledProps): ReactElement {
  const { children, component, $props = {} } = props;
  const ref = useRef<HTMLElement>(null);
  const [label, setLabel] = useState<string | undefined>(undefined);
  const [descriptions, setDescriptions] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (!ref.current) return;

    const labelNode = ref.current.querySelector('[data-label]');
    const descNodes = ref.current.querySelectorAll('[data-description]');

    setLabel(labelNode?.id);
    setDescriptions(
      Array.from(descNodes)
        .map((element) => element.id)
        .join(' ') || undefined
    );
  }, []);

  return createElement(component, {
    ref,
    children,
    'aria-labelledby': label,
    'aria-describedby': descriptions,
    ...$props,
  });
}
