# `Scroll`

The `Scroll` component will create a scrollable container.

## Props

### `children`
> `React.ReactNode` (optional)

### `smooth`
> `boolean` (optional)

Set `scroll-behavior: true` in the container's CSS.

### `hide`
> `boolean` (optional)

Make the container scrollable, but hide the scrollbar.

### `floating`
> `boolean` (optional)

By default, the scroll container sets up a resize observer to keep track of the
height of its parent. The container uses this height to set its `max-height`
property. If this behavior is undesired, setting `floating` to true will prevent
this.
