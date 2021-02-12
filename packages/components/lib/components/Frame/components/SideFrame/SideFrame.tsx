import React, { forwardRef, Ref } from "react";

import { Flex } from "@lib/components/Flex";

export interface SideFrameProps {
  children?: React.ReactNode;
  sidebar?: React.FC<any>;
}

export const SideFrame = forwardRef<HTMLDivElement, SideFrameProps>(
  (props: SideFrameProps, ref: Ref<HTMLDivElement>) => {
    const { children, sidebar: Sidebar } = props;

    return Sidebar ? (
      <Flex expand>
        <Flex.Item ref={ref} shrink={0}>
          <Sidebar />
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

SideFrame.displayName = "SideFrame";
