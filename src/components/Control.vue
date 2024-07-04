<script setup lang="ts">
import { ref } from "vue";
import { TransitionRoot } from "@headlessui/vue";
import socket from "@/lib/socket";
import { User } from "@/definition";

type UserWithRoomIdAndSocketId = {
  roomId: string;
  from: User;
  socketId: string;
};

const showRequest = ref<boolean>(false);
const joinRequest = ref<UserWithRoomIdAndSocketId[]>([]);

socket.on(
  "REQUEST_JOIN",
  (data: { from: User; roomId: string; socketId: string }) => {
    showRequest.value = true;
    joinRequest.value.push(data);
  }
);

const onAccept = (user: UserWithRoomIdAndSocketId) => {
  joinRequest.value = joinRequest.value.filter(
    (jr) => jr.from.id !== user.from.id
  );
  socket.emit("ACCEPT_REQUEST", user);
};

const onDecline = (user: UserWithRoomIdAndSocketId) => {
  joinRequest.value = joinRequest.value.filter(
    (jr) => jr.from.id !== user.from.id
  );
  socket.emit("DECLINE_REQUEST", user);
};
</script>

<template>
  <div class="justify-self-end fixed bottom-0 h-[100px] bg-indigo-900 w-full">
    <div class="w-full h-full flex items-center">
      <div class="w-full h-full flex items-center justify-center gap-x-4">
        <button
          type="button"
          class="bg-indigo-600 text-white w-[50px] h-[50px] rounded-full"
        >
          <i class="ri-mic-fill text-xl"></i>
        </button>
        <button
          type="button"
          class="bg-indigo-600 text-white w-[50px] h-[50px] rounded-full"
        >
          <i class="ri-video-on-fill text-xl"></i>
        </button>
        <button
          type="button"
          class="bg-red-500 text-white w-[50px] h-[50px] rounded-full"
        >
          <i class="ri-phone-fill text-xl"></i>
        </button>
      </div>
      <div class="h-full flex items-center justify-center w-[80px] relative">
        <TransitionRoot
          :show="showRequest"
          enter="transition duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="bg-white w-[300px] h-[350px] absolute bottom-[calc(100%-20px)] right-[calc(100%-45px)] rounded overflow-hidden text-sm"
          >
            <div class="bg-indigo-600 p-2">
              <span class="text-white">Join Request</span>
            </div>
            <div
              v-if="!joinRequest.length"
              class="h-full w-full flex justify-center items-center text-xs"
            >
              <span class="font-semibold -translate-y-4"
                >No request for now!</span
              >
            </div>
            <div
              v-for="req in joinRequest"
              :key="req.from.id"
              class="p-2 flex items-center justify-between bg-indigo-100"
            >
              <div class="flex items-center">
                <span
                  class="h-[25px] w-[25px] flex items-center justify-center text-xs rounded-full bg-violet-300 mr-1.5"
                >
                  {{ req.from.shortName }}
                </span>
                <span class="font-bold font-titillium">{{
                  req.from.name
                }}</span>
              </div>
              <div class="flex text-[10px] gap-x-2">
                <button
                  @click="onDecline(req)"
                  class="py-0.5 px-1.5 bg-red-600 text-white rounded-sm"
                >
                  Decline
                </button>
                <button
                  @click="onAccept(req)"
                  class="py-0.5 px-1.5 bg-green-600 text-white rounded-sm"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </TransitionRoot>
        <button class="justify-self-end" @click="showRequest = !showRequest">
          <i class="ri-user-received-2-fill text-xl text-white"></i>
        </button>
      </div>
    </div>
  </div>
</template>
