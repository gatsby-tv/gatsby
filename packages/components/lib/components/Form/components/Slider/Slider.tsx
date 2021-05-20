import React, { useRef, useState, useEffect, useCallback } from "react";
import { classNames } from "@gatsby-tv/utilities";

import { useForm } from "@lib/utilities/form";
import { Option } from "@lib/types";

import styles from "./Slider.scss";

export interface SliderProps
  extends Omit<
    React.InputHTMLAttributes<HTMLElement>,
    | "id"
    | "accept"
    | "alt"
    | "autoComplete"
    | "capture"
    | "checked"
    | "formAction"
    | "formEncType"
    | "formMethod"
    | "formNoValidate"
    | "formTarget"
    | "height"
    | "max"
    | "min"
    | "multiple"
    | "size"
    | "src"
    | "step"
    | "type"
    | "value"
    | "width"
    | "onChange"
  > {
  id: string;
  min: number;
  max: number;
  stops?: Option<number>[];
  value: number;
  onChange?: (
    value: number,
    id?: string,
    setError?: (id: string, message: string) => void,
    clearError?: (id: string) => void
  ) => void;
}

export function Slider(props: SliderProps): React.ReactElement {
  const {
    id,
    className,
    min,
    max,
    stops,
    value,
    onChange: onChangeHandler,
    ...rest
  } = props;

  const ref = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const { errors, setError, clearError } = useForm();

  const classes = classNames(className, styles.Slider);

  const onChange = useCallback(
    (value: number) => {
      const denormalized = value * (max - min) + min;
      const update = stops
        ? stops
            .map((stop) => stop.value)
            .reduce((acc, stop) =>
              Math.abs(denormalized - stop) < acc ? stop : acc
            )
        : denormalized;

      onChangeHandler?.(update, id, setError, clearError);
    },
    [id, max, min, stops, onChangeHandler]
  );

  const onPointerDown = useCallback(
    (event: any) => {
      if (!ref.current) return;
      event.preventDefault();
      ref.current.setPointerCapture(event.pointerId);
      setDragging(true);
      const { left, width } = ref.current.getBoundingClientRect();
      const value = Math.min(Math.max((event.clientX - left) / width, 0), 1);
      onChange(value);
    },
    [onChange]
  );

  const onPointerMove = useCallback(
    (event: any) => {
      if (!dragging || !ref.current) return;
      const { left, width } = ref.current.getBoundingClientRect();
      const value = Math.min(Math.max((event.clientX - left) / width, 0), 1);
      onChange(value);
    },
    [dragging, onChange]
  );

  const onPointerUp = useCallback((event: any) => {
    if (!ref.current) return;
    setDragging(false);
    ref.current.releasePointerCapture(event.pointerId);
  }, []);

  return (
    <div
      ref={ref}
      className={classes}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      draggable="false"
    >
      <span
        style={{ right: `${100 - (value - min) / (max - min)}` }}
        className={styles.Progress}
      />
    </div>
  );
}
