/* eslint-disable react-hooks/exhaustive-deps */

import { useRef, useEffect, useCallback, DependencyList } from "react";

export interface AsyncMethod<T> {
  (): Promise<T>;
}

export interface AsyncCallback<T> {
  (data: T): void;
}

export function useAsync<T>(
  method: AsyncMethod<T | undefined>,
  callback: AsyncCallback<T>,
  deps: DependencyList
): void {
  const mounted = useRef(false);
  const _method = useCallback(method, deps);
  const _callback = useCallback(callback, []);

  useEffect(() => {
    mounted.current = true;
    _method().then(
      (data?: T) =>
        typeof data !== "undefined" && mounted.current && _callback(data as T)
    );
    return () => {
      mounted.current = false;
    };
  }, [_method, _callback]);
}
