import axios from "axios";

const url = process.env.REACT_APP_LOCAL_URL;

const loginWithUsernameAndPassword = async (username, password) => {
  return await axios
    .post(
      `${url}/user/auth`,
      {
        username,
        password,
      },
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
    .then((res) => res.data);
};

export { loginWithUsernameAndPassword };
