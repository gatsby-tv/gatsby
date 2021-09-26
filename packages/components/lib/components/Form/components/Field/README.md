# `Form.Field`

Text field for a `Form`.

## Props
> Extends `React.InputHTMLAttributes<HTMLElement>`

### `id`
> `string`

The key to use in the form record.

### `value`
> `string`

The current value of the field.

### `multiline`
> `boolean` (optional)

If set, the `<textarea />` HTML tag will be used instead of `<input />`.

### `prefix`
> `React.ReactNode` (optional)

A (usually text) component to prepend to the start of the input area.

### `suffix`
> `React.ReactNode` (optional)

A (usually text) component to append to the end of the input area.

### `validators`
> `Validator[]` (optional)

The list of validators for the input field.

A validator is a function with type `(value: string, id: string) =>
FormErrorState` where `FormErrorState` is either a `FormError`, `undefined`, or a
promise that results in either a `FormError` or `undefined`.

If a validator returns an instance of `FormError`, the form will be invalidated
and will prevent the user from submitting the form's current values. In
addition, if the `Form.Field` is wrapped in `Form.Label` the error message
stored in the `FormError` instance will be displayed to the user.

If a validator returns a promise, it is considered an *asynchronous* form
validator where validation requires some potentially lengthy network request. If
there is currently an error from a synchronous validator, the synchronous error
will take precedent. Otherwise, the form will be in an "invalid" state and
prevent submissions (though, `Label` will not display an error until it the
error is concrete). In addition, while the promise waits to be resolved, a
loading icon will be shown in the input area to indicate that work is being done
to validate the input.

### `onChange`
> `FormChangeHandler` (optional)

The callback to use whenever the user updates the field. Usually this will be a
state dispatch for the `value` prop.
