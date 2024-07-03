import { io } from "socket.io-client";

const API_URL = "http://127.0.0.1:3001";

export default io(API_URL);
