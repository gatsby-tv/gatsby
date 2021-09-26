# Gatsby Utility Library

## Contexts

- [`Form`](./lib/form/README.md)

- [`Frame`](./lib/frame/README.md)

- [`Fullscreen`](./lib/fullscreen/README.md)

- [`IPFS`](./lib/ipfs/README.md)

- [`Scroll`](./lib/scroll/README.md)

- [`SnackBar`](./lib/snack-bar/README.md)

- [`UniqueId`](./lib/unique-id/README.md)

## Hooks

### `useChangeSet`
> `(initial, deps) => ChangeState`

Create a set of values that have default values, tracking which values have been
changed.

##### `initial`
> `Record<string, unknown>`

The data to be managed by the change set.

##### `deps`
> `React.DependencyList`

A dependency list for the change set, the default values are assumed to depend
on the values provided. Whenever a value in the dependency list is modified, the
change set will be reset to whatever the current value of the `initial` argument
is at the time.

#### `ChangeState`

##### `pristine`
> `boolean`

Boolean value indicating whether or not the values in the set have been
modified.

##### `updates`
> `Record<string, unknown>`

Record containing only the keys passed in as the initial argument that have been
modified.

##### `values`
> `Record<string, unknown>`

Record containing all the keys and their associated values.

##### `setValue`
> `(value: unknown, id: string) => void`

Dispatch method for setting the value of a key in the current object.

### `useComponentDidMount`
> `() => React.RefObject<boolean>`

Use a boolean value to determine whether the component invoking the hook has
already mounted.

### `useComponentWillMount`
> `() => boolean`

Use a stateful boolean value for logic that is dependent on the component
invoking the hook as mounted.

### `useController`
> `() => Controller`

A utility hook for creating callbacks for controlling a component that supports
it (such as the `Modal` and `Menu` components).

#### `Controller`

##### `active`
> `boolean`

The current state of the controller.

##### `toggle`
> `() => void`

Flip the current state.

##### `activate`
> `() => void`

Set the current state to `true`.

##### `deactivate`
> `() => void`

Set the current state to `false`.

### `useForwardedRef`
> `(ref: React.Ref<T>) => React.RefObject<T>`

Convert a React reference to an immutable `RefObject`.

### `useMobileDetector`
> `() => boolean | undefined`

Determines whether the current user agent indicates that the operating system is
on a mobile device. Since the `window` object cannot be accessed until the page
mounts, this hook will by default return `undefined`.

### `useParentRef`
> `(ref: React.RefObject<T>) => React.RefObject<P>`

Return a reference to the parent element of the passed reference.

### `useRepaint`
> `() => React.Dispatch<void>`

Return a method that repaints the screen.

### `useResizeObserver`
> `(ref: React.RefObject<T> | T | null | undefined, callback: ((content:
> ResizeObResizeObserverSize) => void))`

Register a callback that is executed whenever the element referenced by `ref`
changes in size.

### `useVolatileKey`
> `(initial: string | (() => string)) => [string,
> React.Dispatch<React.SetStateAction<string>>]`

Return a stateful string that will always change whenever its `setState`
dispatch method is called.

To retrieve the current string (without the extra stuff), you will need to split
the string as `current.split('.')[0]`.

### `useVolatileState`
> `() => [number, React.Dispatch<void>]`

Similar to `useVolatileState`, but without the use of a string.
