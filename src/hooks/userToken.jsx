export const UserToken = () => {
  // const userToken = useAuth.getState().token;
  const userToken = localStorage.getItem("token");
  return userToken;
};
