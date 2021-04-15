import React from "react";
import { classNames, ifExists } from "@gatsby-tv/utilities";

import { useSelection } from "@lib/utilities/selection";
import { TextSubheading } from "@lib/components/TextSubheading";

import styles from "../../Selection.scss";

export interface SectionProps {
  children?: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  flush?: boolean;
}

export function Section(props: SectionProps): React.ReactElement {
  const { children, className, title, flush } = props;

  const classes = classNames(className, styles.Section);

  const TitleMarkup =
    title ? <TextSubheading>{title}</TextSubheading> : null;

  return (
    <div className={classes} data-flush={ifExists(flush)}>
      {TitleMarkup}
      {children}
    </div>
  );
};

Section.Title = TextSubheading;
