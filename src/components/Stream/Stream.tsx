import React, { useCallback, useEffect } from "react";
import { useSWRInfinite } from "swr";
import { Flex } from "@gatsby-tv/components";
import { useScroll } from "@gatsby-tv/components/dist/utilities";

const PAGE_SIZE = 12

export interface StreamProps {}

export function Stream(props: StreamProps) {
  const addScrollListener = useScroll();
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    index => [`https://gatsby.sh:3001/video/list`, index + 1],
    (url, index) => fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: index,
        perPage: PAGE_SIZE,
      }),
    }).then(resp => resp.json())
  );

  const isLoading = (!data && !error) || (size > 0 && data && typeof data[size - 1] === "undefined");

  const handleScroll = useCallback((event) => {
    if (isLoading) return;

    const target = event.currentTarget;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      setSize(size + 1)
    }
  }, [size, isLoading]);

  useEffect(() => {
    addScrollListener(handleScroll);
  }, []);

  return null;
}
