import axios from "axios";
export const registerUser = async (user) => {
  await axios
    .post("http://127.0.0.1:3001/v1/auth/register", {
      full_name: user.full_name,
      email: user.email,
      password: user.password,
    })
    .then((data) => console.log("daata", data?.data))
    .catch((error) => console.log("error", error));
};
