import React from "react";
import { css } from "styled-components";
import { Story, Meta } from "@storybook/react/types-6-0";
import { LoremIpsum } from "react-lorem-ipsum";
import { useModal } from "@gatsby-tv/utilities";

import { AppProvider } from "@lib/components/AppProvider";
import { Card } from "@lib/components/Card";
import { TextHeading } from "@lib/components/TextHeading";
import { TextBox } from "@lib/components/TextBox";
import { Button } from "@lib/components/Button";
import { Scroll } from "@lib/components/Scroll";

import { Modal, ModalProps } from "./Modal";

export default {
  title: "Modal",
  component: Modal,
} as Meta;

const cardStyle = css`
  color: ${(props) => props.theme.colors.font.inverted};
  background-color: ${(props) => props.theme.colors.white};
`;

export const Example: Story<ModalProps> = () => {
  const modal = useModal();

  return (
    <AppProvider theme="dark">
      <Button animate onClick={modal.activate}>
        ClickMe
      </Button>
      <Modal fullscreen active={modal.active} onExit={modal.deactivate}>
        <Card css={cardStyle} w="60vw" h="70vh">
          <Scroll hide>
            <TextBox padding="2rem">
              <TextHeading>Example Modal</TextHeading>
              <LoremIpsum p={10} />
            </TextBox>
          </Scroll>
        </Card>
      </Modal>
    </AppProvider>
  );
};
