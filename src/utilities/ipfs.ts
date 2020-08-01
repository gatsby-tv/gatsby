// IPFS team hasn't put out official types yet
// TODO: Might be a good idea to put together our own eventually
// @ts-ignore
import IPFS from "ipfs";

const ipfs: Promise<any> = IPFS.create({
    repo: "/ipfs/" + Math.random()
});

export default ipfs;
