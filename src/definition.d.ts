export type User = {
  id: string;
  name: string;
  shortName: string;
};

export type Room = {
  createdAt: Date;
  owner: User;
  participant: User[];
  roomId: string;
  roomName: string;
};
