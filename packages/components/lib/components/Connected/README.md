# `Connected`

A container that automatically rounds the corners of its children to create a
seamless list of elements.

## Props 

### `children`
> `React.ReactNode` (optional)

The children in the list. Each child should be a `Connected.Item` component.

### `className`
> `string` (optional)

The class applied to the container.

### `column`
> `boolean` (optional)

Setting `column` to true will arrange child components vertically rather than
horizontally (the default). 

### `prefix`
> `React.ReactNode` (optional)

A fixed sized container prepended to the start of the list.

### `suffix`
> `React.ReactNode` (optional)

A fixed sized container appended to the end of the list.
