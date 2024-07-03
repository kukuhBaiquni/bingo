import { defineStore } from "pinia";
import { User } from "@/definition";

type State = {
  me: User | null;
};

export const useMe = defineStore("me", {
  state: (): State => ({
    me: null,
  }),
  actions: {
    setMe(args: User) {
      this.me = args;
    },
  },
});
