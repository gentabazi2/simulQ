export const verifyAuth = () => {
  let user = localStorage.getItem("userProfile");
  if (user) {
    user = JSON.parse(user);
    if (user._id && user.email && user.full_name) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
