# `Fireworks`

A canvas element that displays fireworks!

Little grey rockets fire from a given location and travel up the screen until
randomly exploding into a bunch of colorful particles.

## Props

### `origin`
> `Origin` (optional)

Either a location or a function that generates a location that specifies where
the fireworks should originate from.

### `toggle`
> `number` (optional)

State that triggers when to fire rockets.

The `toggle` prop is intended to be used with the state provided by the
`useVolatileState` hook. This way, the fireworks can be triggered by calling the
provided dispatch method.

### `count`
> `number` (optional)

The number of fireworks to fire. By default the count is `Infinity`. If used
with a `toggle`, the number of fireworks specified with `count` will be fired
each time the `toggle` state changes.

### `interval`
> `number` (optional)

The number of milliseconds to wait between rockets. By default this value is
`800`.

### `delay`
> `number` (optional)

The number of milliseconds to wait until rockets can begin firing. This prop is
mostly intended to be used when `toggle` is undefined.

### `background`
> `boolean` (optional)

Specifies whether the fireworks should be rendered in the background.

### `foreground`
> `boolean` (optional)

Specifies whether the fireworks should be rendered in the foreground.
