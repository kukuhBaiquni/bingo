import { defineStore } from "pinia";
import { Room } from "@/definition";

type State = {
  roomList: Room[];
};

export const useRoomList = defineStore("roomList", {
  state: (): State => ({
    roomList: [],
  }),
  actions: {
    setRoomList(args: Room[]) {
      this.roomList = args;
    },
  },
});
