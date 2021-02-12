import { useEffect, useRef } from "react";

import { useSelect } from "@lib/use-select";

export interface BreakpointSet {
  [key: string]: string;
}

interface MediaQueryHandler {
  (event: MediaQueryListEvent): void;
}

interface MediaQuerySpecification {
  readonly [key: string]: [MediaQueryList, MediaQueryHandler];
}

export function useBreakpoints<T extends string | number = number>(
  points: BreakpointSet,
  defaultValue: T
): T {
  const queries = useRef<MediaQuerySpecification>({});
  const [selection, setSelection] = useSelect(Object.keys(points));

  useEffect(() => {
    const handleChange = (item: string): MediaQueryHandler => {
      return (event: MediaQueryListEvent) => {
        if (event.matches) {
          setSelection(item);
        }
      };
    };

    queries.current = Object.fromEntries(
      Object.keys(points).map((item) => {
        const query = window.matchMedia(points[item]);
        if (query.matches) setSelection(item);
        const handler = handleChange(item);
        query.addEventListener("change", handler);
        return [item, [query, handler]];
      })
    );

    return () => {
      Object.values(
        queries.current
      ).map((query: [MediaQueryList, MediaQueryHandler]) =>
        query[0].removeEventListener("change", query[1])
      );
    };
  }, [points, setSelection]);

  const result = Object.keys(selection).find((item) => selection[item]);

  if (result !== undefined && !isNaN(+result)) {
    return +result as T;
  } else {
    return (result as T) ?? defaultValue;
  }
}
