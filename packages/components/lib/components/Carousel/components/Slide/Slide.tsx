import { ReactNode, ReactElement } from 'react';

import { useCarousel } from '@lib/utilities/carousel';

import styles from './Slide.scss';

export interface SlideProps {
  children?: ReactNode;
  onClick?: () => void;
}

export function Slide(props: SlideProps): ReactElement {
  const { children, onClick } = props;
  const { groups } = useCarousel();

  return (
    <button
      style={{ width: `${100 / groups}%` }}
      className={styles.Slide}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
