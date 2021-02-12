import React from "react";
import { css } from "styled-components";
import { Story, Meta } from "@storybook/react/types-6-0";

import { AppProvider } from "@lib/components/AppProvider";
import { Box } from "@lib/components/Box";

import { Connected, ConnectedProps } from "./Connected";

const rounded = css`
  border-radius: 1rem;
`;

const PrefixMarkup = () => <Box css={rounded} expand bg="black" w="6rem" />;

const SuffixMarkup = () => <Box css={rounded} expand bg="black" w="6rem" />;

const PrefixColumnMarkup = () => (
  <Box css={rounded} expand bg="black" h="2rem" />
);

const SuffixColumnMarkup = () => (
  <Box css={rounded} expand bg="black" h="2rem" />
);

const ContentMarkup = () => (
  <Connected.Item>
    <Box css={rounded} expand bg="white" h="2rem" />
  </Connected.Item>
);

const ContentListMarkup = () => (
  <>
    <ContentMarkup />
    <ContentMarkup />
    <ContentMarkup />
  </>
);

export default {
  title: "Connected",
  component: Connected,
} as Meta;

export const Default: Story<ConnectedProps> = () => (
  <AppProvider theme="dark">
    <Connected>
      <ContentMarkup />
    </Connected>
  </AppProvider>
);

export const WithMultipleItems: Story<ConnectedProps> = () => (
  <AppProvider theme="dark">
    <Connected>
      <ContentListMarkup />
    </Connected>
  </AppProvider>
);

export const WithPrefixConnection: Story<ConnectedProps> = () => (
  <AppProvider theme="dark">
    <Connected prefix={<PrefixMarkup />}>
      <ContentMarkup />
    </Connected>
  </AppProvider>
);

export const WithSuffixConnection: Story<ConnectedProps> = () => (
  <AppProvider theme="dark">
    <Connected suffix={<SuffixMarkup />}>
      <ContentMarkup />
    </Connected>
  </AppProvider>
);

export const WithBothConnection: Story<ConnectedProps> = () => (
  <AppProvider theme="dark">
    <Connected prefix={<PrefixMarkup />} suffix={<SuffixMarkup />}>
      <ContentMarkup />
    </Connected>
  </AppProvider>
);

export const WithBothConnectionsMultipleItems: Story<ConnectedProps> = () => (
  <AppProvider theme="dark">
    <Connected prefix={<PrefixMarkup />} suffix={<SuffixMarkup />}>
      <ContentListMarkup />
    </Connected>
  </AppProvider>
);

export const Column: Story<ConnectedProps> = () => (
  <AppProvider theme="dark">
    <Connected column>
      <ContentMarkup />
    </Connected>
  </AppProvider>
);

export const ColumnWithMultipleItems: Story<ConnectedProps> = () => (
  <AppProvider theme="dark">
    <Connected column>
      <ContentListMarkup />
    </Connected>
  </AppProvider>
);

export const ColumnWithPrefixConnection: Story<ConnectedProps> = () => (
  <AppProvider theme="dark">
    <Connected column prefix={<PrefixColumnMarkup />}>
      <ContentMarkup />
    </Connected>
  </AppProvider>
);

export const ColumnWithSuffixConnection: Story<ConnectedProps> = () => (
  <AppProvider theme="dark">
    <Connected column suffix={<SuffixColumnMarkup />}>
      <ContentMarkup />
    </Connected>
  </AppProvider>
);

export const ColumnWithBothConnection: Story<ConnectedProps> = () => (
  <AppProvider theme="dark">
    <Connected
      column
      prefix={<PrefixColumnMarkup />}
      suffix={<SuffixColumnMarkup />}
    >
      <ContentMarkup />
    </Connected>
  </AppProvider>
);

export const ColumnWithBothConnectionsMultipleItems: Story<ConnectedProps> = () => (
  <AppProvider theme="dark">
    <Connected
      column
      prefix={<PrefixColumnMarkup />}
      suffix={<SuffixColumnMarkup />}
    >
      <ContentListMarkup />
    </Connected>
  </AppProvider>
);
