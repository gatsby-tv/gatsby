# `Selection`

General component for providing the user a choice between a set of options.

## Props
> Extends `React.AriaAttributes`

### `children`
> `React.ReactNode` (optional)

Children are expected to be `Selection.Item` components.

### `itemClass`
> `string` (optional)

The class to set all child `Selection.Item` components. This is simply to reduce
repetitively setting `className` manually.

### `selection`
> `string` (optional)

The current selection, usually used with the `useState` hook.

### `row`
> `boolean` (optional)

Arrange child components horizontally rather than vertically.

### `scrollHidden`
> `boolean` (optional)

If the child elements are arranged vertically, then the child elements are
wrapped in a `Scroll` container. If this is the case, then setting
`scrollHidden` will hide the scrollbar on the container.

### `onSelect`
> `(option: string) => void`

The callback that is executed whenever the user makes a selection.
