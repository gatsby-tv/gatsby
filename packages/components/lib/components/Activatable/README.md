# `Activatable`

The `Activatable` component is a simple `div` wrapper that allows for a boolean
value to control whether its contents are visible.

## Props

### `children`
> `React.ReactNode` (optional)

### `className`
> `string` (optional)

### `active`
> `boolean` (optional)

When true, the opacity of the `div` is set to `1`, otherwise the opacity is `0`.
The opacity is animated, so there will be a transition between states.

### `duration`
> `Duration` (optional)

The speed of the animation.

### `delay`
> `Duration` (optional)

The delay of the animation.
