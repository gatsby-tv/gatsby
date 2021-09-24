# Design

## Stack

Gatsby is built using React and Typescript, using SCSS for styling and NextJS for
hosting. The project is built using Yarn 2, leveraging its support for workspaces
to create a monorepo.

## Structure

Gatsby is split up into several packages to allow for code reuse between
applications. Principally, packages are delegated to reusable code falling under
one of several categories (see [#Directories](#directories) for more detailed
explaination):

1. Component libraries
2. Layout libraries
3. Service libraries
4. Utility libraries

In addition, few non-trivial and integral components are awarded their own
dedicated packages such as the [video player](../packages/player/docs) and [video
preview](../packages/preview/docs) components.

The web application for the site itself is found at the root of the repository. The
public packages are listed as follows:

- **[@gatsby-tv/components](../packages/components/README.md):**
  The main component library.
- **[@gatsby-tv/layout](../packages/layout/README.md):**
  The main layout library.
- **[@gatsby-tv/services](../packages/services/README.md):**
  The main service library.
- **[@gatsby-tv/utilities](../packages/utilities/README.md):**
  The main utility library.
- **[@gatsby-tv/icons](../packages/icons/README.md):**
  Icon svg/component library.
- **[@gatsby-tv/player](../packages/player/README.md):**
  Gatsby's video player component.
- **[@gatsby-tv/preview](../packages/preview/README.md):**
  Gatsby's video preview component.

Source directories within a package are organized similarly to the workspaces
themselves &mdash; namely, source files are generally organized between
components, layout, services, and utilities. However, in the application itself
we also include pages (or routes in applications that aren't using NextJS).

## Components

Components, generally, refer to independent and reusable components that may be
used anywhere. Though, the name is also used to refer to subcomponents that are
used to break up other more complicated components.

Some components are broken up into subcomponents for readability reasons and for
separation of concerns, while other components expose their subcomponents to
provide more flexability to clients. For example, the `Staging` component in
`@gatsby-tv/components` is used to segregate UI elements into groups that can
be arranged into a sequence of stages &mdash; where each stage can transition
to the next relevant stage by sliding into/out of a designated container.
This component is organized in the project directories as follows:

```
{@gatsby-tv/components}/src/components/

    > Staging/
      > components/
        > Stage/
          | index.ts
          | Stage.tsx

      > stories/
        | Staging.stories.scss
        | Staging.stories.tsx
      
    | index.ts
    | Staging.scss
    | Staging.tsx
```

(See [#Storybook](#storybook) for info on the story components).

The two components of interest are the main `Staging` component and the `Stage`
subcomponent. `Staging` creates a context for managing state, while `Stage`
allows clients to deliminate individual groups of elements belonging to each
stage. However, neither `Staging.tsx` nor `index.ts` export the `Stage`
components, instead, clients are required to import `Staging` and access the
subcomponent through the property `Staging.Stage`.

For information on coding standards for components, see the [standards
page](standards.md).

## Layout

While components are designed to be self-sufficient and reusable, layout refers
to components that arrange groups of components for specialized purposes. The
purpose of layout components is to abstract over stateful and reactive portions
of pages.

Layout components are often messy and may require extensive nesting, but they
are nonetheless organized in a particular way. Namely, layout components make
heavy use of exposing subcomponents as a means of separating concerns.

## Services

Services generalize access to persisted data or IO operations. Most often, these
are requests to [WestEgg](https://github.com/gatsby-tv/westegg), our backend.
Requests made to our API are handled by [`swr`](https://github.com/vercel/swr),
abstracting away the asynchronous state through the React hooks they provide.

## Utilities

While, naturally, utilities comprise general helper functions, they also where
React context definitions and custom hooks are maintained. Contexts will always
be stored as a directory with a `context.ts` file for the context type and
definition and a `hooks.ts` file for custom hooks that create and access the
context.

Besides the hooks that provide access to contexts, custom hooks will always
be defined in a dedicated file with the hook function name written in kebab-case
(e.g. the hook `useComponentDidMount` would be defined in
`use-component-did-mount.ts`)
