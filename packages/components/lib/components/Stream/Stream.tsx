import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Spinner } from "@gatsby-tv/icons";
import { useScroll, useTheme } from "@gatsby-tv/utilities";

import { Flex } from "@lib/components/Flex";
import { Icon } from "@lib/components/Icon";

export interface StreamProps<T> {
  component: React.FC<T>;
  generator: () => void;
  data?: T[];
  loading?: boolean;
}

export function Stream<T>(props: StreamProps<T>): React.ReactElement {
  const { component: SourceComponent, generator, loading, data = [] } = props;
  const { addScrollListener, removeScrollListener } = useScroll();
  const [waiting, setWaiting] = useState(false);
  const theme = useTheme();

  const handleScroll = useCallback(
    (event) => {
      const target = event.currentTarget;
      if (
        !loading &&
        target.scrollHeight - target.scrollTop === target.clientHeight
      ) {
        generator();
      }
    },
    [loading, generator]
  );

  useEffect(() => {
    if (loading) {
      const id = setTimeout(() => setWaiting(true), 100);
      return () => clearTimeout(id);
    } else {
      setWaiting(false);
    }
  }, [loading]);

  useEffect(() => {
    addScrollListener(handleScroll);
    return () => removeScrollListener(handleScroll);
  }, [addScrollListener, removeScrollListener, handleScroll]);

  const children = useMemo(
    () =>
      data.map((item, index) => (
        <SourceComponent key={`stream.${index}`} {...item} />
      )),
    [data, SourceComponent]
  );

  const LoadingMarkup = waiting ? (
    <Flex css={{ gridColumn: "1 / -1" }} expand center>
      <Icon src={Spinner} w={theme.icon.largest} />
    </Flex>
  ) : null;

  return (
    <>
      {children}
      {LoadingMarkup}
    </>
  );
}
