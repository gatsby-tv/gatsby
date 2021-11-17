import { ReactNode, ReactElement } from 'react';
import { Class } from '@gatsby-tv/utilities';

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
      className={Class("Slide", styles.Slide)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
