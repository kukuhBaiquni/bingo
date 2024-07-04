<script setup lang="ts">
import Control from "@/components/Control.vue";
import { User } from "@/definition";
import useRTC from "@/helpers/useRTC";
import socket from "@/lib/socket";
import { onBeforeUnmount, ref } from "vue";
import { useRoute } from "vue-router";
import { debounce } from "throttle-debounce";

const route = useRoute();

const joinedUser = ref<User[]>([]);

onBeforeUnmount(() => {
  const selfVideo: HTMLVideoElement = document.querySelector(
    "#self-vid"
  ) as HTMLVideoElement;
  selfVideo.srcObject = null;
  socket.disconnect();
  globalThis.PEER.close();
});

const { createPeerConnection } = useRTC();

socket.on("INITIATE_CONNECTION", async (data) => {
  console.log("RECEIVE INITIATE");
  if (data.participant.length > 1) {
    console.log("EXEC CONNECTION");
    await createPeerConnection();
  }
});

socket.on(
  "OFFER",
  async (data: { offer: RTCSessionDescription; user: User }) => {
    console.log("%cRECEIVE OFFER", "color: green; font-size: 16px", data.offer);
    await createPeerConnection();
    await globalThis.PEER.setRemoteDescription(
      new RTCSessionDescription(data.offer)
    );

    const answer = await globalThis.PEER.createAnswer();
    await globalThis.PEER.setLocalDescription(
      new RTCSessionDescription(answer)
    );

    console.log("SEND ANSWER", answer);
    socket.emit("ANSWER", { answer, roomId: route.query.roomId });
  }
);

socket.on("ANSWER", async (data) => {
  console.log("%cRECEIVE ANSWER", "color: yellow; font-weight: 900", data);
  await globalThis.PEER.setRemoteDescription(new RTCSessionDescription(data));
});

const setJoinedUser = debounce(500, (value: User[]) => {
  joinedUser.value = value;
});

socket.on("ICE_CANDIDATE", async (data) => {
  console.log("%cRECEIVE ICE CANDIDATE", "color: darkred;", data.iceCandidate);
  try {
    const candidate = new RTCIceCandidate(data.iceCandidate);
    await globalThis.PEER.addIceCandidate(candidate);
    console.log("JOINED", data.participant);
    setJoinedUser(data.participant);
    console.log("%cSUCCES add ice Candidate", "color: green; font-size: 14px");
  } catch (err) {
    console.log("%cFailed to add ice candidate", "color: red");
  }
});
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen bg-black">
    <div class="flex gap-x-2">
      <video
        class="h-[400px] w-[400px] border border-zinc-500 bg-black"
        autoPlay
        id="self-vid"
        playsInline
      ></video>
      <video
        class="h-[400px] w-[400px] border border-zinc-500 bg-black"
        autoPlay
        id="remote-vid"
        playsInline
      ></video>
    </div>
    <Control />
  </div>
</template>
