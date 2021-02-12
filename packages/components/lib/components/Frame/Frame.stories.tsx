import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { useTheme } from "@gatsby-tv/utilities";

import { AppProvider } from "@lib/components/AppProvider";
import { Grid } from "@lib/components/Grid";
import { Box } from "@lib/components/Box";

import { Image } from "@lib/components/Image";

import { Frame, FrameProps } from "./Frame";

export default {
  title: "Frame",
  component: Frame,
} as Meta;

const TopbarMarkup = () => {
  const theme = useTheme();

  return <Box h="52px" bg={theme.colors.background[1]} />;
};

const SidebarMarkup = () => {
  const theme = useTheme();

  return <Box w="52px" h={1} bg={theme.colors.background[2]} />;
};

const ContentMarkup = () => (
  <Grid margin={["52px", "52px", "0px"]} template="repeat(3, 1fr)" gap="16px">
    {[...Array(12)].map((_, index) => (
      <Grid.Item key={index}>
        <Image aspectRatio={0.5625} />
      </Grid.Item>
    ))}
  </Grid>
);

export const Example: Story<FrameProps> = () => (
  <AppProvider theme="dark">
    <Frame topbar={TopbarMarkup} sidebar={SidebarMarkup}>
      <ContentMarkup />
    </Frame>
  </AppProvider>
);
