# `AppProvider`

`AppProvider` is the main context provider for clients using
`@gatsby-tv/components`. It is always assumed that `AppProvider` is an ancestor
to any given component defined in `@gatsby-tv/components`.

## Props

### `children`
> `React.ReactNode` (optional)

### `deps`
> `React.DependencyList`

The `deps` prop provides a dependency list for the top-level effects of some
contexts. For example, `ModalContext` may need to clear all active modals when
the application routes to a new page. It's not the best solution, so this may
change in the future.
