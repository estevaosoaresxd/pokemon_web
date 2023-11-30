import { socket } from "../socket";

export const socket = io(URL, {
  autoConnect: false,
});
