import { ReactNode, ReactElement } from 'react';
import { Class, Exists, useStyles } from '@gatsby-tv/utilities';

import { TextSubheading } from '@lib/components/TextSubheading';

export interface SectionProps {
  children?: ReactNode;
  className?: string;
  title?: ReactNode;
  flush?: boolean;
}

export function Section(props: SectionProps): ReactElement {
  const { children, className, title, flush } = props;
  const styles = useStyles();

  const classes = Class("Section", className, styles.Section);

  const TitleMarkup = title ? <TextSubheading>{title}</TextSubheading> : null;

  return (
    <div className={classes} data-flush={Exists(flush)}>
      {TitleMarkup}
      {children}
    </div>
  );
}

Section.Title = TextSubheading;
