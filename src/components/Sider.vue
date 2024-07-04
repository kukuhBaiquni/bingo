<script setup lang="ts">
import { Room } from "@/definition";
import { ref } from "vue";

const isJoining = ref(false);
const props = defineProps<{
  roomList: Room[];
  onRequestJoin: (room: Room) => void;
}>();

const joining = (room: Room) => {
  isJoining.value = true;
  props.onRequestJoin(room);
};
</script>

<template>
  <div className="col-span-2 h-screen overflow-auto bg-indigo-500 pr-2">
    <div className="p-2 flex flex-col gap-y-2 font-mono">
      <h3 className="font-semibold text-white">Available Room</h3>
      <div
        @click="joining(room)"
        v-for="room in roomList"
        :key="room.roomId"
        className="h-[80px] w-full bg-indigo-700 rounded p-1.5 text-white text-xs relative cursor-pointer"
      >
        <span className="font-semibold">{{ room.roomName }}</span>
        <p>by: {{ room.owner.name }}</p>
        <div
          className="absolute bottom-0 left-0 w-full flex items-center gap-x-1 p-1 text-indigo-300"
        >
          <i class="ri-user-fill text-base"></i>
          <span
            >{{ room.participant.length }}
            {{ isJoining ? "Joining.." : "" }}</span
          >
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
</template>
