# `SnackBar`

The `SnackBar` component is a toast element that displays a temporary message at
the bottom of the window. This component, however, is not meant to be used
directly (one could conceive of it acting like a "singleton" component).
Instead, a single `SnackBar` component is mounted in `AppProvider` and its
content is set using the `useSnackBar` hook provided in `@gatsby-tv/utilities`.

This module does, however, export the `Snack` component, which is a utility that
allows for creating `SnackBar` content that has an optional prefix and/or
suffix.

This component is injected into the `"$foreground"` target.
