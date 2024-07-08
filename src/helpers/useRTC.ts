import socket from "@/lib/socket";
import { useMe } from "@/store/useMe";
import { useRoute } from "vue-router";
import { onMounted, onBeforeUnmount } from "vue";

export default function useRTC({ count }: { count: number }): {
  createPeerConnection: () => Promise<void>;
} {
  const me = useMe();
  const route = useRoute();

  onMounted(async () => {
    // socket.emit("INITIATE_CONNECTION", {
    //   roomId: route.query.roomId,
    //   me: me.me,
    // });
  });

  onBeforeUnmount(() => {
    const stream = globalThis.SELF_STREAM.getTracks();
    stream.forEach((track) => track.stop());

    globalThis.PEER.setLocalDescription();
    const sender = globalThis.PEER.getSenders();
    console.log("SENDER", sender);
    globalThis.PEER.removeTrack;
    globalThis.PEER.close();
  });

  const initializeDevice = async () => {
    const selfVideo: HTMLVideoElement = document.querySelector(
      // "#self-vid"
      `#self-vid`
    ) as HTMLVideoElement;

    globalThis.SELF_STREAM = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });
    selfVideo.srcObject = globalThis.SELF_STREAM;
    selfVideo.onloadedmetadata = () => {
      selfVideo.play();
      selfVideo.muted = true;
    };
  };

  const createPeerConnection = async () => {
    globalThis.PEER = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    await initializeDevice();
    globalThis.SELF_STREAM.getTracks().forEach((track) => {
      globalThis.PEER.addTrack(track, globalThis.SELF_STREAM);
    });

    globalThis.PEER.onicecandidate = handleIceCandidateEvent;
    globalThis.PEER.ontrack = handleTrackEvent;
    globalThis.PEER.onnegotiationneeded = handleNegotiation;
  };
  const handleNegotiation = async () => {
    const offer = await globalThis.PEER.createOffer();

    console.log("%cSEND NEGO & OFFER", "color: orange", offer);
    socket.emit("OFFER", {
      offer,
      from: me.me,
      roomId: route.query?.roomId,
    });
    await globalThis.PEER.setLocalDescription(new RTCSessionDescription(offer));
  };

  const handleTrackEvent = (e: RTCTrackEvent) => {
    console.log("TRACK EVENT~~~");
    const remoteVid: HTMLVideoElement = document.querySelector(
      `#remote-vid`
    ) as HTMLVideoElement;

    const [stream] = e.streams;
    remoteVid.srcObject = stream;
    remoteVid.onloadedmetadata = () => {
      remoteVid.play();
    };
  };

  const handleIceCandidateEvent = (e: RTCPeerConnectionIceEvent) => {
    console.log("SEND ICE CANDIDATE", e.candidate);
    socket.emit("ICE_CANDIDATE", {
      iceCandidate: e.candidate,
      roomId: route.query?.roomId,
      from: me.me,
    });
  };

  return {
    createPeerConnection,
  };
}
