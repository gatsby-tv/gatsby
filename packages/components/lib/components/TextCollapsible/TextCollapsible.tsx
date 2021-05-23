import React, { useRef, useEffect } from 'react';
import { DownTick } from '@gatsby-tv/icons';
import { classNames, ifExists, useUniqueId } from '@gatsby-tv/utilities';

import { TextBox } from '@lib/components/TextBox';
import { Icon } from '@lib/components/Icon';

import styles from './TextCollapsible.scss';

export interface TextCollapsibleProps {
  children?: React.ReactNode;
  className?: string;
  label?: string;
  active?: boolean;
}

export function TextCollapsible(
  props: TextCollapsibleProps
): React.ReactElement {
  const { children, className, active, label: text } = props;
  const id = useUniqueId('collapsible');
  const label = useRef<HTMLLabelElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!content.current || !label.current) return;
    content.current.style.width = `${
      label.current.getBoundingClientRect().width
    }px`;

    label.current.addEventListener('keydown', (event: Event) => {
      const code = (event as any).code;
      if (code === 'Enter' || code === 'Space') {
        event.preventDefault();
        event.stopPropagation();
        label.current?.click();
      }
    });
  }, []);

  const classes = classNames(className, styles.Collapsible);

  return (
    <div className={classes}>
      <input
        id={id}
        className={styles.VisuallyHidden}
        type="checkbox"
        checked={ifExists(active)}
      />
      <label ref={label} htmlFor={id} className={styles.Label} tabIndex={-1}>
        {text}
        <Icon className={styles.Icon} src={DownTick} />
      </label>
      <TextBox ref={content} className={styles.Content}>
        {children}
      </TextBox>
    </div>
  );
}
