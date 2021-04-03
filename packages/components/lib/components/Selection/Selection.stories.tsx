import React from "react";
import { css } from "styled-components";
import { Story, Meta } from "@storybook/react/types-6-0";
import { useSelect } from "@gatsby-tv/utilities";

import { AppProvider } from "@lib/components/AppProvider";
import { TextBox } from "@lib/components/TextBox";
import { Box } from "@lib/components/Box";
import { cssTransition } from "@lib/styles/transition";

import { Selection, SelectionProps } from "./Selection";

export default {
  title: "Selection",
  component: Selection,
} as Meta;

const selectionStyle = css`
  ${Selection.Item}[aria-selected] {
    color: ${(props) => props.theme.colors.blue};
    background-color: ${(props) => props.theme.colors.background[3]};
  }

  ${Selection.Item} {
    padding: ${(props) => props.theme.spacing[1]}
      ${(props) => props.theme.spacing[1.5]};
    ${(props) => cssTransition("all", props.theme.duration.fastest, "ease")}
  }

  ${Selection.Section.Title} {
    padding: ${(props) => props.theme.spacing[0.5]}
      ${(props) => props.theme.spacing[1.5]};
  }
`;

const wrapperStyle = css`
  background-color: ${(props) => props.theme.colors.background[4]};
`;

export const OneSection: Story<SelectionProps> = () => {
  const items = ["one", "two", "three"];
  const [selection, select] = useSelect(items, "one");

  return (
    <AppProvider theme="dark">
      <Box css={wrapperStyle} w="20rem" h="20rem">
        <Selection
          css={selectionStyle}
          scrollHidden
          selection={selection}
          onSelect={select}
        >
          <Selection.Section>
            <Selection.Item option="one">
              <TextBox>One</TextBox>
            </Selection.Item>
            <Selection.Item option="two">
              <TextBox>Two</TextBox>
            </Selection.Item>
            <Selection.Item option="three">
              <TextBox>Three</TextBox>
            </Selection.Item>
          </Selection.Section>
        </Selection>
      </Box>
    </AppProvider>
  );
};

export const MultipleSections: Story<SelectionProps> = () => {
  const items = ["one", "two", "three", "four", "five"];
  const [selection, select] = useSelect(items, "one");

  return (
    <AppProvider theme="dark">
      <Box css={wrapperStyle} w="20rem" h="30rem">
        <Selection
          css={selectionStyle}
          scrollHidden
          selection={selection}
          onSelect={select}
        >
          <Selection.Section title="first">
            <Selection.Item option="one">
              <TextBox>One</TextBox>
            </Selection.Item>
            <Selection.Item option="two">
              <TextBox>Two</TextBox>
            </Selection.Item>
            <Selection.Item option="three">
              <TextBox>Three</TextBox>
            </Selection.Item>
          </Selection.Section>
          <Selection.Section title="second">
            <Selection.Item option="four">
              <TextBox>Four</TextBox>
            </Selection.Item>
            <Selection.Item option="five">
              <TextBox>Five</TextBox>
            </Selection.Item>
          </Selection.Section>
        </Selection>
      </Box>
    </AppProvider>
  );
};

export const Row: Story<SelectionProps> = () => {
  const items = ["one", "two", "three"];
  const [selection, select] = useSelect(items, "one");

  return (
    <AppProvider theme="dark">
      <Box css={wrapperStyle} w="25rem">
        <Selection
          css={selectionStyle}
          row
          selection={selection}
          onSelect={select}
        >
          <Selection.Section>
            <Selection.Item option="one">
              <TextBox align="center">One</TextBox>
            </Selection.Item>
            <Selection.Item option="two">
              <TextBox align="center">Two</TextBox>
            </Selection.Item>
            <Selection.Item option="three">
              <TextBox align="center">Three</TextBox>
            </Selection.Item>
          </Selection.Section>
        </Selection>
      </Box>
    </AppProvider>
  );
};
