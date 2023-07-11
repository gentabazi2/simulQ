export const getUserData = () => {
  return JSON.parse(localStorage.getItem("userProfile"));
};
