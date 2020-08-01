// TODO: IPFS team hasn't put out official types yet,
// might be a good idea to put together our own eventually
// @ts-ignore
import IPFS from "ipfs";

// TODO: Add webrtc and websocket (dedicated relay servers) transport options

const ipfs: Promise<any> = IPFS.create({
  // TODO: Set production instance to use the same repo and dev to use random per tab
  repo: "/ipfs/" + Math.random(),
  config: {
    Addresses: {
      Swarm: [
        // TODO: Set production and dev urls for signal/relay servers

        // Webrtc peer discovery
        "/ip4/127.0.0.1/tcp/9090/ws/p2p-webrtc-star",
        // "/dns4/webrtc-star.gatsby.tv/tcp/9090/wss/p2p-webrtc-star",

        // TODO: Backup websocket-star relay server (webrtc unsupported)
        // "/ip4/127.0.0.1/tcp/9091/ws/p2p-websocket-star"
        // "/dns4/websocket-star.gatsby.tv/9091/wss/p2p-websocket-star"
      ]
    },
    Bootstrap: [],
    Discovery: {
      webRTCStar: {
        Enabled: true
      }
    }
  }
});

export default ipfs;
