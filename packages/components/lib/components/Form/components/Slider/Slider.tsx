import {
  useRef,
  useState,
  useEffect,
  useCallback,
  SetStateAction,
  InputHTMLAttributes,
  ReactElement,
} from 'react';
import { usePopper } from 'react-popper';
import {
  Class,
  Exists,
  useForm,
  FormChangeHandler,
} from '@gatsby-tv/utilities';

import { Optional } from '@lib/components/Optional';
import { Option } from '@lib/types';

import styles from './Slider.scss';

export interface SliderProps
  extends Omit<
    InputHTMLAttributes<HTMLElement>,
    | 'id'
    | 'accept'
    | 'alt'
    | 'autoComplete'
    | 'capture'
    | 'checked'
    | 'formAction'
    | 'formEncType'
    | 'formMethod'
    | 'formNoValidate'
    | 'formTarget'
    | 'height'
    | 'max'
    | 'min'
    | 'multiple'
    | 'size'
    | 'src'
    | 'step'
    | 'type'
    | 'value'
    | 'width'
    | 'onChange'
  > {
  id: string;
  min: number;
  max: number;
  value: number;
  stops?: Option<number>[];
  hideLabels?: boolean;
  onChange?: FormChangeHandler<number>;
}

export function Slider(props: SliderProps): ReactElement {
  const {
    id,
    className,
    min,
    max,
    stops,
    hideLabels,
    value,
    onChange,
    ...rest
  } = props;

  const slider = useRef<HTMLDivElement>(null);
  const [reference, setReference] = useState<HTMLDivElement | null>(null);
  const [popper, setPopper] = useState<HTMLDivElement | null>(null);
  const [position, setPositionBase] = useState(
    () => (value - min) / (max - min)
  );
  const [dragging, setDragging] = useState(false);
  const { setValue } = useForm();

  const { styles: style, attributes, update } = usePopper(reference, popper, {
    placement: 'top',
    strategy: 'absolute',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 30],
        },
      },
      {
        name: 'preventOverflow',
        options: {
          tether: false,
        },
      },
      { name: 'flip' },
      { name: 'arrow' },
    ],
  });

  const classes = Class(
    styles.Slider,
    stops && !hideLabels && styles.SliderWithStops
  );

  useEffect(() => {
    const value = Math.round(position * (max - min) + min);
    setValue(value, id);
    onChange?.(value, id);
  }, [position, id, max, min, onChange]);

  const setPosition = useCallback(
    (value: SetStateAction<number>) =>
      setPositionBase((current) => {
        const position = typeof value === 'function' ? value(current) : value;
        const denormalized = position * (max - min) + min;
        const result = stops
          ? stops
              .map((stop) => stop.value)
              .reduce((acc, stop) =>
                Math.abs(denormalized - stop) < Math.abs(denormalized - acc)
                  ? stop
                  : acc
              )
          : denormalized;

        return (result - min) / (max - min);
      }),
    [max, min, stops]
  );

  const onPointerDown = useCallback(
    (event: any) => {
      if (!slider.current) return;
      event.preventDefault();
      update?.();
      setDragging(true);
      slider.current.setPointerCapture(event.pointerId);
      const { left, width } = slider.current.getBoundingClientRect();
      const value = Math.min(Math.max((event.clientX - left) / width, 0), 1);
      setPosition(value);
    },
    [update]
  );

  const onPointerMove = useCallback(
    (event: any) => {
      if (!dragging || !slider.current) return;
      update?.();
      const { left, width } = slider.current.getBoundingClientRect();
      const value = Math.min(Math.max((event.clientX - left) / width, 0), 1);
      setPosition(value);
    },
    [dragging, update]
  );

  const onPointerUp = useCallback((event: any) => {
    if (!slider.current) return;
    setDragging(false);
    slider.current.releasePointerCapture(event.pointerId);
  }, []);

  const StopsMarkup = stops
    ? stops.map((stop, index) => (
        <div
          key={`Slider.Stop.${stop.value}`}
          style={{
            left: `calc(${(100 * (stop.value - min)) / (max - min)}% - 2px)`,
          }}
          className={styles.Stop}
        >
          {!hideLabels && (
            <span data-selected={Exists(stop.value === value)}>
              {stop.label}
            </span>
          )}
        </div>
      ))
    : null;

  const PopperMarkup = !stops ? (
    <>
      <div
        ref={setReference}
        style={{ right: `${100 * (1 - position)}%` }}
        className={styles.Reference}
      />
      <div
        ref={setPopper}
        style={style.popper}
        className={Class(styles.Popper, dragging && styles.PopperActive)}
        {...attributes.popper}
      >
        <span>{`${Math.round(100 * position)}%`}</span>
        <div data-popper-arrow />
      </div>
    </>
  ) : null;

  return (
    <div className={className}>
      <div
        ref={slider}
        className={classes}
        draggable="false"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {StopsMarkup}
        <span
          style={{ right: `${100 * (1 - position)}%` }}
          className={styles.Progress}
        />
      </div>
      {PopperMarkup}
      <input value={value} type="hidden" {...rest} />
    </div>
  );
}
