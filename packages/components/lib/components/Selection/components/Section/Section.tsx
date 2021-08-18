import { ReactNode, ReactElement } from 'react';
import { Class, Exists } from '@gatsby-tv/utilities';

import { useSelection } from '@lib/utilities/selection';
import { TextSubheading } from '@lib/components/TextSubheading';

import styles from '../../Selection.scss';

export interface SectionProps {
  children?: ReactNode;
  className?: string;
  title?: ReactNode;
  flush?: boolean;
}

export function Section(props: SectionProps): ReactElement {
  const { children, className, title, flush } = props;

  const classes = Class(className, styles.Section);

  const TitleMarkup = title ? <TextSubheading>{title}</TextSubheading> : null;

  return (
    <div className={classes} data-flush={Exists(flush)}>
      {TitleMarkup}
      {children}
    </div>
  );
}

Section.Title = TextSubheading;
