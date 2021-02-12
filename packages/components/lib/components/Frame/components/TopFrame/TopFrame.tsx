import React, { forwardRef, Ref } from "react";

import { Flex } from "@lib/components/Flex";

export interface TopFrameProps {
  children?: React.ReactNode;
  topbar?: React.FC<any>;
}

export const TopFrame = forwardRef<HTMLDivElement, TopFrameProps>(
  (props: TopFrameProps, ref: Ref<HTMLDivElement>) => {
    const { children, topbar: Topbar } = props;

    return Topbar ? (
      <Flex column expand>
        <Flex.Item ref={ref} as="nav" shrink={0}>
          <Topbar />
        </Flex.Item>
        <Flex.Item shrink={1} grow={1} basis={1}>
          {children}
        </Flex.Item>
      </Flex>
    ) : (
      <>{children}</>
    );
  }
);

TopFrame.displayName = "TopFrame";
