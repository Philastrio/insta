export const isAuthenticated = request => {
  if (!request.user) {
    throw Error("에러발생. 로그인해야 함");
  }
  return;
};
