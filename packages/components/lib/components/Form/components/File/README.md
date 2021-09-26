# `Form.File`

Allow the user to select a file from their filesystem.

## Props
> Extends `React.InputHTMLAttributes<HTMLElement>`

### `id`
> `string`

The key to use in the form record.

### `value`
> `File | null`

The currently selected file. Note that a type of `File` is not exactly ideal for
sending to a backend. As such, this may be refactored in the future.

### `onChange`
> `FormChangeHandler<File | null>` (optional)

The callback to use whenever the user updates the field. Usually this will be a
state dispatch for the `value` prop.
