# `Stream`

Component for generating an endless list of a component. The list of components
is generated in groups at a time and an additional group is requested whenever
the user scrolls to the bottom of the available space in the container.

## Props

### `component`
> `React.FC<T>`

The component to use to create new elements in the list.

### `generator`
> `() => void` (optional)

A callback to invoke whenever more data is needed for a group of elements in the
stream.

### `data`
> `T[]` (optional)

The `data` prop stores the current data that is being used as props for each
current element in the stream.

### `loading`
> `boolean` (optional)

Tells the stream that it is currently waiting for more data. The stream will
insert a loading spinner at the end of the current element list.
