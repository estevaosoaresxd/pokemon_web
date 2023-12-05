import { io } from "socket.io-client";

const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const socket = io(process.env.REACT_APP_LOCAL_URL, {
  query: {
    token: user ? user.token : null,
  },
});
