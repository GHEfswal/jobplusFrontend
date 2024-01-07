import cookie from "js-cookie";
import jwt_decode from "jwt-decode";

const AUTH_KEY = "jobplus-token";

export const useCookie = () => {
  // saveAuthCookie
  // const saveAuthCookie = (token, expires = 4 / 24) => {
  const saveAuthCookie = (token, expires = 7) => {
    cookie.set(AUTH_KEY, token, { expires: expires });
  };

  // deleteAuthCookie
  // const deleteAuthCookie = (key) => {
  const deleteAuthCookie = () => {
    cookie.remove(AUTH_KEY);
  };

  // getAuthCookietry
  const getAuthCookie = () => {
    return cookie.get(AUTH_KEY);
  };

  // isAuthCookieExpired
  const isAuthCookieExpired = () => {
    const token = getAuthCookie();
    if (!token) return true;
    // console.log(token);
    const { exp } = jwt_decode(token);
    // return exp;
    const currentTime = Date.now() / 1000; // to get in milliseconds
    return exp < currentTime; // will be true if expired
  };

  // hasValidAuthCookie
  const hasValidAuthCookie = (key) => {
    return !isAuthCookieExpired();
  };

  // get logged in user id

  const getLoggedInUserId = () => {
    const token = getAuthCookie();
    if (!token) return null;
    // console.log(token);
    // console.log(jwt_decode(token));
    const { id } = jwt_decode(token);
    return id;
  };

  return {
    saveAuthCookie,
    deleteAuthCookie,
    getAuthCookie,
    isAuthCookieExpired,
    hasValidAuthCookie,
    getLoggedInUserId,
  };
};
