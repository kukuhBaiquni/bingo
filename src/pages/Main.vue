<script setup lang="ts">
import { useRoomList } from "@/store/useRoomList";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ref } from "vue";
import socket from "@/lib/socket";
import { Room } from "@/definition";
import Sider from "@/components/Sider.vue";

const router = useRouter();

const roomListStore = useRoomList();
const { roomList } = storeToRefs(roomListStore);

const name = ref<string>("");
const showErrorName = ref<boolean>(false);

socket.on("ACCEPT_REQUEST", (data) => {
  router.push({
    path: "/vid-call",
    query: {
      roomId: data,
    },
  });
  socket.emit("INITIATE_CONNECTION", {
    roomId: data,
  });
});

const onCreateRoom = () => {
  if (!name.value) {
    showErrorName.value = true;
  } else {
    showErrorName.value = false;
    socket.emit("CREATE_ROOM", name.value);
  }
};

const onRequestJoin = (room: Room) => {
  // router.push({
  //   path: "/vid-call",
  //   query: {
  //     roomId: room.roomId,
  //   },
  // });
  if (!name.value) {
    showErrorName.value = true;
  } else {
    socket.emit("REQUEST_JOIN", {
      room,
      name: name.value,
    });
  }
};
</script>

<template>
  <div className="grid grid-cols-12 h-screen w-screen">
    <Sider :roomList="roomList" :onRequestJoin="onRequestJoin" />
    <div className="col-span-10">
      <div
        className="w-full h-full flex flex-col items-center justify-center bg-black"
      >
        <h3 className="text-2xl text-white text-center font-semibold">
          Tell us your name
        </h3>
        <input
          className="w-[300px] bg-transparent border-b border-b-zinc-300 p-2 text-white text-center"
          type="text"
          v-model="name"
        />
        {errorName && (
        <span className="text-sm text-red-400 translate-y-2">
          Please enter your name
        </span>
        )}
        <button
          className="bg-indigo-500 block mt-4 py-1.5 w-[200px] text-white rounded"
          @click="onCreateRoom"
          type="button"
        >
          Create Room
        </button>
      </div>
    </div>
  </div>
</template>
