# Unique ID Context

Unique IDs are important for creating ID strings that are guaranteed to be
globally unique. There usage is particularly helpful when specifying ARIA
attributes and injection targets (See
[`Injection`](../../../components/lib/components/Injection/README.md)).

## `UniqueIdContextType`
> `(prefix: string) => UniqueIdGeneratorType`

The unique id context is a stateful function that returns a function for
generating new unique ids within a namespace defined by `prefix`.

## `UniqueIdGeneratorType`
> `() => string`

A stateful function that returns a new unique id every invocation.

## `useUniqueIdContext`
> `() => UniqueIdContextType`

Create a new `UniqueIdContext`.

## `useUniqueId`
> `(prefix: string) => string`

Create a new unique id local to a component using the namespace specified by
`prefix`.
