# Gatsby web-client frontend

## Running the react client
1. Install NodeJS (version `>=10.0` recommended)
2. Ensure some version of python (version `>=2.7`) is installed on your machine and is accesible via your path. (js-ipfs needs python to build during `npm install`)
2. Run `npm install` in this directory
3. Run `npm start` in this directory

## Running the libp2p WebRTC signalling server
1. Run `npx libp2p-webrtc-star star-signal --port=9090 --host=127.0.0.1` this will expose a WebRTC signalling server on port 9090 to connect IPFS browser peers

## TODO: Running the libp2p websocket relay server

Note: This project was built with create-react-app and internal react dependencies are hidden from the package.json file.