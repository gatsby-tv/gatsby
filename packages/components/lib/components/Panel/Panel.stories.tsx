import React, { useState, useEffect } from "react";
import { css } from "styled-components";
import { Story, Meta } from "@storybook/react/types-6-0";
import { useSelect, useModal } from "@gatsby-tv/utilities";

import { AppProvider } from "@lib/components/AppProvider";
import { TextBox } from "@lib/components/TextBox";
import { Box } from "@lib/components/Box";
import { Flex } from "@lib/components/Flex";
import { Button } from "@lib/components/Button";
import { Selection } from "@lib/components/Selection";
import { cssTransition } from "@lib/styles/transition";

import { Panel, PanelProps } from "./Panel";

export default {
  title: "Panel",
  component: Panel,
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

const panelStyle = css`
  background-color: ${(props) => props.theme.colors.background[5]};
`;

export const InsideContainer: Story<PanelProps> = () => {
  const [selection, select] = useSelect(["top", "right", "bottom", "left"]);
  const [direction, setDirection] = useState<string | undefined>();
  const current = Object.keys(selection).find((item) => selection[item]);

  useEffect(() => {
    if (current) {
      setDirection(current);
    } else {
      const id = setTimeout(() => setDirection(undefined), 300);
      return () => clearTimeout(id);
    }
  }, [current]);

  return (
    <AppProvider theme="dark">
      <Box css={wrapperStyle} w="20rem" h="20rem">
        <Selection
          css={selectionStyle}
          scrollHidden
          selection={selection}
          onSelect={select}
        >
          <Selection.Item option="top">
            <TextBox>Top</TextBox>
          </Selection.Item>
          <Selection.Item option="right">
            <TextBox>Right</TextBox>
          </Selection.Item>
          <Selection.Item option="bottom">
            <TextBox>Bottom</TextBox>
          </Selection.Item>
          <Selection.Item option="left">
            <TextBox>Left</TextBox>
          </Selection.Item>
        </Selection>
        <Panel active={Boolean(current)} direction={direction} onExit={select}>
          <Flex css={panelStyle} expand center>
            <TextBox style={{ textTransform: "uppercase" }}>
              {direction}
            </TextBox>
          </Flex>
        </Panel>
      </Box>
    </AppProvider>
  );
};

export const AsModal: Story<PanelProps> = () => {
  const { active, activate, deactivate } = useModal();

  return (
    <AppProvider theme="dark">
      <Button onClick={activate}>
        Activate
      </Button>
      <Panel active={active} onExit={deactivate}>
        <Flex css={panelStyle} expand center>
          <TextBox style={{ textTransform: "uppercase" }}>
            Active
          </TextBox>
        </Flex>
      </Panel>
    </AppProvider>
  );
};
