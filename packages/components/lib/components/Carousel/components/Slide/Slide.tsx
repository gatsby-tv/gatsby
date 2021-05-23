import React from 'react';

import { useCarousel } from '@lib/utilities/carousel';

import styles from '../../Carousel.scss';

export interface SlideProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

export function Slide(props: SlideProps): React.ReactElement {
  const { children, onClick } = props;
  const { groups } = useCarousel();

  return (
    <div
      style={{ width: `${100 / groups}%` }}
      className={styles.Slide}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
