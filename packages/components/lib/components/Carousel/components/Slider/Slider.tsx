import { CSSProperties, ReactNode, ReactElement } from 'react';

import styles from '../../Carousel.scss';

export type SliderState = {
  slide: number;
  desired: number;
};

export type SliderAction = { type: 'jump'; desired: number } | { type: 'sync' };

export interface SliderProps {
  children?: ReactNode;
  state: SliderState;
  groups: number;
}

export function Slider(props: SliderProps): ReactElement {
  const { children, state, groups } = props;
  const distance = state.slide - state.desired;

  const style: CSSProperties = {
    width: `${100 * (groups + 2)}%`,
    left: `${-100 * (state.slide + 1)}%`,
    transform: 'translateX(0)',
    transition: 'none',
  };

  if (distance) {
    const direction =
      Math.sign(distance) * (Math.abs(distance) <= groups / 2 ? 1 : -1);

    const shift = (direction * 100) / (groups + 2);
    style.transform = `translateX(${shift}%)`;
    style.transition = `transform 500ms ease`;
  }

  return (
    <div style={style} className={styles.Slider}>
      {children}
    </div>
  );
}
