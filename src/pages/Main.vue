<script setup lang="ts">
import { useRoomList } from "@/store/useRoomList";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import socket from "@/lib/socket";

const roomListStore = useRoomList();
const { roomList } = storeToRefs(roomListStore);

const name = ref<string>("");
const showErrorName = ref<boolean>(false);

const onCreateRoom = () => {
  if (!name) {
    showErrorName.value = true;
  } else {
    showErrorName.value = false;
    socket.emit("CREATE_ROOM", name.value);
  }
};
</script>

<template>
  <div className="grid grid-cols-12 h-screen w-screen">
    <div className="col-span-2 h-screen overflow-auto bg-indigo-500 pr-2">
      <div className="p-2 flex flex-col gap-y-2 font-mono">
        <h3 className="font-semibold text-white">Available Room</h3>
        <div
          v-for="room in roomList"
          :key="room.roomId"
          className="h-[80px] w-full bg-indigo-700 rounded p-1.5 text-white text-xs relative"
        >
          <span className="font-semibold">{{ room.roomName }}</span>
          <p>by: {{ room.owner.name }}</p>
          <div
            className="absolute bottom-0 left-0 w-full flex items-center gap-x-1 p-1 text-indigo-300"
          >
            <i className="bx bxs-user text-base"></i>
            <span>{{ room.participant.length }}</span>
          </div>
        </div>
        <h4
          v-if="!roomList.length"
          className="font-normal italic text-xs leading-none text-white"
        >
          There is no active room
        </h4>
      </div>
    </div>
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
          className="bg-indigo-500 block mt-8 py-1.5 w-[200px] text-white rounded"
          @click="onCreateRoom"
          type="button"
        >
          Create Room
        </button>
      </div>
    </div>
  </div>
</template>
