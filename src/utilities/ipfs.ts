// TODO: IPFS team hasn't put out official types yet,
// might be a good idea to put together our own eventually
// @ts-ignore
import IPFS from "ipfs";

// TODO: Add webrtc and websocket (dedicated relay servers) transport options

const ipfs: Promise<any> = IPFS.create({
    repo: "/ipfs/" + Math.random()
});

export default ipfs;
