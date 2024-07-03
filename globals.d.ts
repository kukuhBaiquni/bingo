export {};

declare global {
  let PEER: RTCPeerConnection;
  let STREAM: MediaStream;
  function createPeerConnection();
}
