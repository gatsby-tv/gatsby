import IPFS from "ipfs";

const ipfs = IPFS.create({
    repo: "/ipfs/" + Math.random()
});

export default ipfs;