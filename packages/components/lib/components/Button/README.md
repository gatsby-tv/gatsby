# `Button`

The `<button />` abstraction. The `Button` component supports more advanced
`onDblClick` behavior, animation, and tooltips.

## Props

### `children`
> `React.ReactNode` (optional)

### `unstyled`
> `boolean` (optional)

Do not apply text styling or padding to the button. It is assumed that the
caller has their own agenda in mind when using this option.

### `animate`
> `animate` (optional)

Specify that the button should be animated when clicked. If `unstyled` is set,
this option is a no-op.

### `tooltip`
> `string` (optional)

Add a tooltip that displays whenever the user hovers over the button.

### `icon`
> `IconSource` (optional)

Override the content of the button by using an icon. Providing an icon will
circularize the button container.

### `size`
> `IconSize` (optional)

If the `icon` prop is set, the `size` prop will set the size of the icon.

### `waiting`
> `boolean` (optional)

Option for specifying that the action being performed by the button is underway.
When set to `true`, the button's content will be replaced with a spinner.
