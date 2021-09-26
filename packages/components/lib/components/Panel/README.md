# `Panel`

Creates a component that slides in from the edges of its container.

## Props

### `children`
> `React.ReactNode` (optional)

### `direction`
> `'top' | 'right' | 'bottom' | 'left'` (optional)

Specifies the direction that the panel slides in from. For example
`direction="left"` will specify that the panel should slide in *from the left*.
The default value is `"right"`.

### `draggable`
> `boolean` (optional)

Specifies whether the panel component can be dragged when on mobile.

### `overlay`
> `boolean` (optional)

When true, the panel uses the whole window as the container to slide in over.

### `active`
> `boolean` (optional)

The `active` prop controls whenever the panel should be visible or not. When set
to true, the panel will slide in as specified in the `direction` prop.
