import { initializeGoogleAuth } from '../../../api';
import {
  deleteUserProfile,
  deleteUserStats,
  getUserProfile,
  getUserStats,
  postUserProfile,
  postUserStats
} from '../profile';
import { AUTH_LOGOUT, AUTH_LOGIN } from '../../types/auth';
import {setNetworkError} from "../ui";

export const login = (user) => {
  return async (dispatch) => {
    const { id } = user;

    // read
    // determine if the user is there
    // if not, create
    try {
      await dispatch(getUserStats(id));

      // FOR TESTING PURPOSES OF 500 ERROR
      // await dispatch(postUserStats(id));
    } catch (response) {
      const { status: httpStatus } = response;

      if (httpStatus === 404) {
        await dispatch(postUserStats(id));
      }

      if (httpStatus === 500) {
        await dispatch(setNetworkError('A user with the same id was already created.'));
      }
    }

    // read profile
    // determine if the user has a profile
    // if not, create
    try {
      await dispatch(getUserProfile(id));

      // FOR TESTING PURPOSES OF 500 ERROR
      // await dispatch(postUserProfile(id));
    } catch (response) {
      const { status: httpStatus } = response;

      if (httpStatus === 404) {
        await dispatch(postUserProfile(id));
      }

      if (httpStatus === 500) {
        await dispatch(setNetworkError('A user with the same id was already created.'));
      }
    }

    dispatch(setLogin(user));
  };
};

export const setLogin = (user) => {
  return {
    type: AUTH_LOGIN,
    payload: user,
  };
};

export const logout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

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
    });
  };
};

export const requestDeleteUserStats = (user) => {
  return async (dispatch) => {
    const { id } = user;

    try {
      await dispatch(deleteUserStats(id));
    } catch (response) {
      const { status: httpStatus } = response;

      if (httpStatus === 404) {
        await dispatch(setNetworkError('The user you want to delete was not found'));
      }
    }

    try {
      await dispatch(deleteUserProfile(id));
    } catch (response) {
      const { status: httpStatus } = response;

      if (httpStatus === 404) {
        await dispatch(setNetworkError('The user you want to delete was not found'));
      }
    }
    dispatch(requestSignOut());
  }
}
