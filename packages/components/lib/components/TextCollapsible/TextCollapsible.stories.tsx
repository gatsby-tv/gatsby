import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { css } from "styled-components";
import { LoremIpsum } from "react-lorem-ipsum";

import { AppProvider } from "@lib/components/AppProvider";
import { Box } from "@lib/components/Box";
import { TextBox } from "@lib/components/TextBox";

import { TextCollapsible, TextCollapsibleProps } from "./TextCollapsible";

export default {
  title: "TextCollapsible",
  component: TextCollapsible,
} as Meta;

const style = css`
  padding: ${(props) => props.theme.spacing[0.5]}
    ${(props) => props.theme.spacing[1]};
  border-radius: ${(props) => props.theme.border.radius.small};
`;

const labelStyle = css`
  ${style}
  background-color: ${(props) => props.theme.colors.background[3]};
`;

const contentStyle = css`
  ${style}
  background-color: ${(props) => props.theme.colors.background[2]};
`;

export const Example: Story<TextCollapsibleProps> = () => (
  <AppProvider theme="dark">
    <Box w="42rem">
      <TextCollapsible css={labelStyle} label="Click Me">
        <TextBox css={contentStyle}>
          <LoremIpsum p={2} />
        </TextBox>
      </TextCollapsible>
    </Box>
  </AppProvider>
);
