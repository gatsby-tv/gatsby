import React, { useState, useEffect, useCallback } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Scroll } from "@lib/components/Scroll";
import { Image } from "@lib/components/Image";
import { Stream, StreamProps } from "@lib/components/Stream";

import styles from "./Stream.stories.scss";

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
    <div className={styles.Container}>
      <Scroll>
        <Image className={styles.Image} src="https://loremflickr.com/405/405" />
        <div className={styles.Stream}>
          <Stream
            component={Image}
            data={data}
            generator={generator}
            loading={loading}
          />
        </div>
      </Scroll>
    </div>
  );
};
