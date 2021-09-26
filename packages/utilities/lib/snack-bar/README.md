# SnackBar Context

## `SnackBarContextType`

### `active`
> `boolean`

Boolean determining whether the `SnackBar` is currently visible.

### `config`
> `SnackBarConfig`

The currently set config.

### `setConfig`
> `React.Dispatch<React.SetStateAction<SnackBarConfig | undefined>>`

Dispatch method for setting the config. Setting the configuration to `undefined`
will clear the `SnackBar`.

## `SnackBarConfig`

### `content`
> `React.ReactNode | Promise<React.ReactNode>`

The content of the `SnackBar`. If this is a `ReactNode` then it is rendered
immediately; otherwise, if it is a promise, then the `SnackBar` will render a
loading spinner until the promise resolves.

### `duration`
> `number` (optional)

The duration for how long the content set by `content` should be displayed until
the `SnackBar` disappears. If this is omitted, then the `SnackBar` will be
pinned indefinitely until dismissed explicitly.

## `useSnackBarContext`
> `() => SnackBarContextType`

Create a new `SnackBarContext`.

## `useSnackBar`
> `() => [SnackBarConfig, React.Dispatch<React.SetStateAction<SnackBarConfig>>]`

Return the `config` and `setConfig` fields of the current `SnackBarContext`.
