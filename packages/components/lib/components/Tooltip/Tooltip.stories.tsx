import React, { useRef } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { AppProvider } from "@lib/components/AppProvider";
import { Box } from "@lib/components/Box";
import { Button } from "@lib/components/Button";

import { Tooltip, TooltipProps } from "./Tooltip";

export default {
  title: "Tooltip",
  component: Tooltip,
} as Meta;

export const Example: Story<TooltipProps> = () => {
  const ref = useRef<HTMLElement>(null);

  return (
    <AppProvider theme="dark">
      <Box ref={ref} w="fit-content">
        <Button>HoverMe</Button>
      </Box>
      <Tooltip for={ref} fade placement="right">
        Hello! This is a tooltip.
      </Tooltip>
    </AppProvider>
  );
};
