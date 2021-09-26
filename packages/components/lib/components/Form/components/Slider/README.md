# `Form.Slider`

The `Form.Slider` component is a slider that allows users to select an
enumerated value from a sequence.

## Props
> Extends `React.InputHTMLAttributes<HTMLElement>`

### `id`
> `string`

The key to use in the form record.

### `min`
> `number`

The lower bound of the values to select from.

### `max`
> `number`

The upper bound of the values to select from.

### `value`
> `number`

The currently select value.

### `stops`
> `Option<number>[]` (optional)

By default, the values that can be selected using the slider is the continuous
interval between the `min` and `max` values. However, when `stops` are provided,
the interval is converted to a discrete distribution of values within the
interval.

The labels of each `Option` are displayed above the slider unless the
`hideLabels` prop is set to true.

### `onChange`
> `FormChangeHandler<number>` (optional)

The callback that is fired whenever the user selects a new value.
