# Scroll Context

## `ScrollContextType`

### `scroll`
> `React.RefObject<number>`

A reference storing the current scroll offset of the container.

### `setScroll`
> `React.Dispatch<React.SetStateAction<number>>`

A dispatch method for setting the scroll offset of the container.

### `addScrollListener`
> `(handler: EventHandler) => void`

A method for registering a callback for scroll events on the container.

### `removeScrollListener`
> `(handler: EventHandler) => void`

A method for removing a callback from the set of listeners.

## `useScrollContext`
> `(ref: React.RefObject<T>) => ScrollContextType`

Create a new scroll context.

## `useScroll`
> `() => ScrollContextType`

Fetch the current scroll context.

## `useStabilizedCallback`
> `(callback: ((...args: any[]) => void), deps: React.DependencyList) =>
> ((...args: any[]) => any)`

A special variation of the `useCallback` hook that restores the scroll offset
after having been invoked.
