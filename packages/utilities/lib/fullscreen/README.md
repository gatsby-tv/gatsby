# Fullscreen Context

## `FullscreenContextType`

### `fullscreen`
> `boolean`

Boolean state reflecting whether the current app is fullscreen or not.

### `setFullscreen`
> `React.Dispatch<React.SetStateAction<boolean>>`

Set the fullscreen mode of the app.

## `useFullscreenContext`
> `() => FullscreenContextType`

Create a new context for use in the provider component. This context
must be unique and will throw an exception otherwise.

## `useFullscreen`
> `() => FullscreenContextType`

Return the current `FullscreenContext`.
