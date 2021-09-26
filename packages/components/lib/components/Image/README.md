# `Image`

Display an image.

## Props

### `src`
> `IPFSContent | string` (optional)

The source for the image, either a URL (`string`) or IPFS hash (`IPFSContent`).
See `@gatsby-tv/types` package in
[WestEgg](https://github.com/gatsby-tv/westegg) for the definition of
`IPFSContent`.

### `rounded`
> `BorderRadius` (optional)

Describe the amount in which the corners of the image should be rounded.

### `aspectRatio`
> `string | number` (optional)

Set the aspect ratio of the image explicitly. This is either a string using the
same syntax as the `aspect-ratio` CSS property, or a number representing a
proportion.

### `overlay`
> `React.ReactNode` (optional)

The overlay display content in an absolute container stretched over the image.
