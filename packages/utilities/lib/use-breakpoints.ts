import { useState, useEffect, useRef } from "react";

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
  defaultValue?: T
): T {
  const key = JSON.stringify(points);
  const queries = useRef<MediaQuerySpecification>({});
  const [selection, setSelection] = useState<string | undefined>(undefined);

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
  }, [key]);

  if (selection !== undefined && !isNaN(+selection)) {
    return +selection as T;
  } else {
    return (selection as T) ?? defaultValue;
  }
}
