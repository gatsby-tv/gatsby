# `Avatar`

Display a circular avatar.

## Props

### `src`
> `IPFSContent | string`

The source for the avatar image, either a URL (`string`) or IPFS hash (`IPFSContent`).
See `@gatsby-tv/types` package in
[WestEgg](https://github.com/gatsby-tv/westegg) for the definition of
`IPFSContent`.

### `size`
> `DiscreteSize` (optional)

The size of the avatar.

### `overlay`
> `React.ReactNode` (optional)

The overlay displays content in an absolute container stretched over the avatar. 
