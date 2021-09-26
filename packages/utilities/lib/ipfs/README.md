# IPFS Context

The IPFS node within the browser.

## `IPFSContextType`

### `ipfs`
> `any`

The IPFS node.

### `error`
> `Error | null`

The error (if any) thrown during IPFS initialization.

## `useIPFSNode`
> `(bootstrap: string[]) => IPFSContextType`

Create a new IPFS node. The IPFS context must be unique.

## `useIPFS`
> `() => IPFSContextType`

Return the IPFS node.

## `useIPFSContent`
> `(content?: IPFSContent) => IPFSContentState`

Fetches an IPFS hash, returning a generated object URL for the data.

### `IPFSContentState`

#### `url`
> `string | undefined`

The object URL of the content being fetched by IPFS.

#### `loading`
> `boolean`

Boolean indicating whether the content is still being fetched.

## `useIPFSPeers`
> `() => IPFSPeersState`

Fetch the current peers connected to the local IPFS node.

### `IPFSPeersState`

#### `peers`
> `Array<any>`

The currently connected peers.

#### `loading`
> `boolean`

Boolean indicating whether the peers are currently being queried.

## `useIPFSVideoStream`
> `(hash?: string) => IPFSStreamController`

### `IPFSStreamController`

#### `stream`
> `IPFSStreamState`

#### `setQuality`
> `React.Dispatch<React.SetStateAction<number>>`

Set the HLS playback quality.

### `IPFSStreamState`

#### `ref`
> `React.RefObject<HTMLVideoElement>`

The reference to be passed to the `<video />` element.

#### `quality`
> `number`

The current playback quality.

#### `levels`
> `Record<number, number>`

The available playback qualities.
