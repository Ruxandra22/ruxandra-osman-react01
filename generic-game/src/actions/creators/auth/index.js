import {AUTH_LOGIN, AUTH_LOGOUT} from "../../types/auth";
import {initializeGoogleAuth} from "../../../api";


export const login = (user) => {
  return {
    type: AUTH_LOGIN,
    payload: user,
  };
}

export const logout = () => {
  return {
    type: AUTH_LOGOUT,
  };
}

export const requestSignIn = () => {
  return async () => {
    return initializeGoogleAuth().then((GoogleAuth) => {
      GoogleAuth.signIn();
    });
  };
};

export const requestSignOut = () => {
  return async () => {
    return initializeGoogleAuth().then((GoogleAuth) => {
      GoogleAuth.signOut();
    })
  }
}
