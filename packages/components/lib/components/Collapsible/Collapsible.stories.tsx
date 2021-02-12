import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { css } from "styled-components";
import { LoremIpsum } from "react-lorem-ipsum";

import { AppProvider } from "@lib/components/AppProvider";
import { Box } from "@lib/components/Box";
import { TextBox } from "@lib/components/TextBox";

import { Collapsible, CollapsibleProps } from "./Collapsible";

export default {
  title: "Collapsible",
  component: Collapsible,
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

export const Example: Story<CollapsibleProps> = () => (
  <AppProvider theme="dark">
    <Box w="42rem">
      <Collapsible css={labelStyle} label="Click Me">
        <TextBox css={contentStyle}>
          <LoremIpsum p={2} />
        </TextBox>
      </Collapsible>
    </Box>
  </AppProvider>
);
