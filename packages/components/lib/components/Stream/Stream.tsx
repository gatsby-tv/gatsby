import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Spinner } from '@gatsby-tv/icons';
import { useScroll } from '@gatsby-tv/utilities';

import { Icon } from '@lib/components/Icon';

import styles from './Stream.scss';

export interface StreamProps<T> {
  component: React.FC<T>;
  generator?: () => void;
  data?: T[];
  loading?: boolean;
}

export function Stream<T>(props: StreamProps<T>): React.ReactElement {
  const { component: SourceComponent, generator, loading, data = [] } = props;

  const { addScrollListener, removeScrollListener } = useScroll();
  const [waiting, setWaiting] = useState(false);

  const onScroll = useCallback(
    (event) => {
      const target = event.currentTarget;
      if (
        !loading &&
        target.scrollHeight - target.scrollTop === target.clientHeight
      ) {
        generator?.();
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
    addScrollListener(onScroll);
    return () => removeScrollListener(onScroll);
  }, [addScrollListener, removeScrollListener, onScroll]);

  const children = useMemo(
    () =>
      data.map((item, index) => (
        <SourceComponent key={`stream.${index}`} {...item} />
      )),
    [data, SourceComponent]
  );

  const LoadingMarkup = waiting ? (
    <div className={styles.Loading}>
      <Icon src={Spinner} size="largest" />
    </div>
  ) : null;

  return (
    <>
      {children}
      {LoadingMarkup}
    </>
  );
}
