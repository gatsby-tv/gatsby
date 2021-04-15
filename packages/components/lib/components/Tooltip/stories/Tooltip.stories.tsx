import React, { useRef } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Button } from "@lib/components/Button";
import { Tooltip, TooltipProps } from "@lib/components/Tooltip";

export default {
  title: "Tooltip",
  component: Tooltip,
} as Meta;

export const Example: Story<TooltipProps> = () => {
  const ref = useRef<HTMLElement>(null);

  return (
    <>
      <Button ref={ref}>HoverMe</Button>
      <Tooltip for={ref} placement="right">
        Hello! This is a tooltip.
      </Tooltip>
    </>
  );
};
