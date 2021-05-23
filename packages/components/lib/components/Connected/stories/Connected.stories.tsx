import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { classNames } from '@gatsby-tv/utilities';

import { Connected, ConnectedProps } from '@lib/components/Connected';

import styles from './Connected.stories.scss';

const AppendageMarkup = () => <div className={styles.Blue} />;

const AppendageColumnMarkup = () => (
  <div className={classNames(styles.Blue, styles.Column)} />
);

const ContentMarkup = () => <Connected.Item className={styles.White} />;

const ContentListMarkup = () => (
  <>
    <Connected.Item className={styles.White} />
    <Connected.Item className={styles.White} />
    <Connected.Item className={styles.White} />
  </>
);

export default {
  title: 'Connected',
  component: Connected,
} as Meta;

export const Default: Story<ConnectedProps> = () => (
  <Connected>
    <ContentMarkup />
  </Connected>
);

export const WithMultipleItems: Story<ConnectedProps> = () => (
  <Connected>
    <ContentListMarkup />
  </Connected>
);

export const WithPrefixConnection: Story<ConnectedProps> = () => (
  <Connected prefix={<AppendageMarkup />}>
    <ContentMarkup />
  </Connected>
);

export const WithSuffixConnection: Story<ConnectedProps> = () => (
  <Connected suffix={<AppendageMarkup />}>
    <ContentMarkup />
  </Connected>
);

export const WithBothConnection: Story<ConnectedProps> = () => (
  <Connected prefix={<AppendageMarkup />} suffix={<AppendageMarkup />}>
    <ContentMarkup />
  </Connected>
);

export const WithBothConnectionsMultipleItems: Story<ConnectedProps> = () => (
  <Connected prefix={<AppendageMarkup />} suffix={<AppendageMarkup />}>
    <ContentListMarkup />
  </Connected>
);

export const Column: Story<ConnectedProps> = () => (
  <Connected column>
    <ContentMarkup />
  </Connected>
);

export const ColumnWithMultipleItems: Story<ConnectedProps> = () => (
  <Connected column>
    <ContentListMarkup />
  </Connected>
);

export const ColumnWithPrefixConnection: Story<ConnectedProps> = () => (
  <Connected column prefix={<AppendageColumnMarkup />}>
    <ContentMarkup />
  </Connected>
);

export const ColumnWithSuffixConnection: Story<ConnectedProps> = () => (
  <Connected column suffix={<AppendageColumnMarkup />}>
    <ContentMarkup />
  </Connected>
);

export const ColumnWithBothConnection: Story<ConnectedProps> = () => (
  <Connected
    column
    prefix={<AppendageColumnMarkup />}
    suffix={<AppendageColumnMarkup />}
  >
    <ContentMarkup />
  </Connected>
);

export const ColumnWithBothConnectionsMultipleItems: Story<ConnectedProps> = () => (
  <Connected
    column
    prefix={<AppendageColumnMarkup />}
    suffix={<AppendageColumnMarkup />}
  >
    <ContentListMarkup />
  </Connected>
);
