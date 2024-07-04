import socket from "@/lib/socket";
import { Room, User } from "@/definition";
import { useMe } from "@/store/useMe";
import { useRoomList } from "@/store/useRoomList";
import { useRouter } from "vue-router";

export default function socketEvent() {
  const { setMe } = useMe();
  const { setRoomList } = useRoomList();

  const router = useRouter();

  socket.on("BLAST_ROOM", (data: Room[]) => {
    setRoomList(data);
  });

  socket.on("ME", (data: User) => {
    localStorage.setItem("me", JSON.stringify(data));
    setMe(data);
  });

  socket.on("INITIATE_ROOM", (data: Room) => {
    router.push({
      path: "/vid-call",
      query: {
        roomId: data.roomId,
      },
    });
  });
}
