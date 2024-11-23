import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: [],
});

// "undefined" means the URL will be computed from the `window.location` object
// const URL =
//   process.env.NODE_ENV === "production"
//     ? "https://backend.yummydiscover.com"
//     : "https://backend.yummydiscover.com";
const socketURL = import.meta.env.VITE_URL_SOCKET;
const URL = socketURL || "http://localhost:4000";
export const socket = io(URL, {
  transports: ["websocket"], // force WebSocket transport
});

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});
