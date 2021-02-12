import React, { useState, useEffect, useCallback } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { AppProvider } from "@lib/components/AppProvider";
import { Box } from "@lib/components/Box";
import { Flex } from "@lib/components/Flex";
import { Scroll } from "@lib/components/Scroll";
import { Image } from "@lib/components/Image";

import { Stream, StreamProps } from "./Stream";

export default {
  title: "Stream",
  component: Stream,
} as Meta;

export const Example: Story<StreamProps> = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const generator = useCallback(() => setLoading(true), []);

  useEffect(() => {
    const load = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setData((data) => [...data, { src: "https://loremflickr.com/405/405" }]);
      setLoading(false);
    };

    if (loading) {
      load();
    }
  }, [loading]);

  return (
    <AppProvider theme="dark">
      <Box w="30rem" h="30rem">
        <Scroll>
          <Box marginBottom="2rem">
            <Image src="https://loremflickr.com/405/405" />
          </Box>
          <Flex column gap="2rem">
            <Stream
              component={Image}
              data={data}
              generator={generator}
              loading={loading}
            />
          </Flex>
        </Scroll>
      </Box>
    </AppProvider>
  );
};
