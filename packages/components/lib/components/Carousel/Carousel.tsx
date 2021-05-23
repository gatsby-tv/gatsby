import React, {
  useRef,
  useState,
  useEffect,
  useReducer,
  useCallback,
} from 'react';
import { ExtendLeft, ExtendRight } from '@gatsby-tv/icons';
import {
  classNames,
  useResizeObserver,
  useMobileDetector,
} from '@gatsby-tv/utilities';

import { CarouselContext } from '@lib/utilities/carousel';
import { Button } from '@lib/components/Button';

import { Slider, SliderState, SliderAction } from './components/Slider';
import { Slide, SlideProps } from './components/Slide';

import styles from './Carousel.scss';

export type { SlideProps as CarouselSlideProps };

export interface CarouselProps {
  children?: React.ReactNode;
  groups: number;
}

export function Carousel(props: CarouselProps): React.ReactElement | null {
  const { children, groups } = props;
  const mask = useRef<HTMLDivElement>(null);
  const [width, setWidthBase] = useState<string>('100%');
  const isMobile = useMobileDetector();

  const setWidth = useCallback(
    (value: string) =>
      setWidthBase(isMobile ? `calc(${value} + ${100 / groups / 2}%)` : value),
    [isMobile, groups]
  );

  /* We need the number of visible items per group to divide the total
   * number of items evenly. Thus, perhaps controversially, we will remove
   * any remainders. */

  const items = React.Children.count(children);

  const slides = React.Children.toArray(children).slice(
    0,
    items - (items % groups)
  );

  const chunks = Array.from(
    { length: Math.ceil(slides.length / groups) },
    (_, index) => slides.slice(index * groups, (index + 1) * groups)
  );

  const [state, dispatch] = useReducer(
    (state: SliderState, action: SliderAction) => {
      switch (action.type) {
        case 'jump':
          return { ...state, desired: action.desired };

        case 'sync':
          return { ...state, slide: state.desired };
      }
    },
    { slide: 0, desired: 0 }
  );

  useResizeObserver(mask, (content) => setWidth(`${content.inlineSize}px`));

  useEffect(() => {
    const id = setTimeout(() => dispatch({ type: 'sync' }), 500);
    return () => clearTimeout(id);
  }, [state.desired]);

  const next = useCallback(
    () =>
      dispatch({ type: 'jump', desired: (state.slide + 1) % chunks.length }),
    [state.slide, chunks.length]
  );

  const prev = useCallback(
    () =>
      dispatch({
        type: 'jump',
        desired: (state.slide + chunks.length - 1) % chunks.length,
      }),
    [state.slide, chunks.length]
  );

  if (isMobile === undefined) return null;

  const GroupsMarkup = chunks.map((chunk, index) => (
    <div
      key={`CarouselGroup-${index}`}
      style={{ width }}
      className={styles.Group}
    >
      {chunk}
    </div>
  ));

  const ContentMarkup = !isMobile ? (
    <>
      <Slider state={state} groups={chunks.length}>
        <div style={{ width }} className={styles.Group}>
          {chunks[chunks.length - 1]}
        </div>
        {GroupsMarkup}
        <div style={{ width }} className={styles.Group}>
          {chunks[0]}
        </div>
      </Slider>
      <Button
        className={classNames(styles.Button, styles.ButtonLeft)}
        icon={ExtendLeft}
        animate
        onClick={prev}
      />
      <Button
        className={classNames(styles.Button, styles.ButtonRight)}
        icon={ExtendRight}
        animate
        onClick={next}
      />
    </>
  ) : (
    GroupsMarkup
  );

  return (
    <CarouselContext.Provider value={{ groups }}>
      <div className={styles.Carousel}>
        <div
          ref={mask}
          className={classNames(styles.Mask, isMobile && styles.Mobile)}
        >
          {ContentMarkup}
        </div>
      </div>
    </CarouselContext.Provider>
  );
}

Carousel.Slide = Slide;
