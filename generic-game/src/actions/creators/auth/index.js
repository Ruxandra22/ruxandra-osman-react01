import { initializeGoogleAuth } from '../../../api';
import {
  deleteUserProfile,
  deleteUserStats,
  getUserProfile,
  getUserStats,
  postUserProfile,
  postUserStats
} from '../profile';
import {AUTH_LOGOUT, AUTH_LOGIN, SET_USERS, SET_USER} from '../../types/auth';
import {setNetworkError} from "../ui";
import {readUsers} from "../../../api/users";

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

// should be in a users slice!!
export const getUsers = (force = false) => {
  return async (dispatch, getState) => {
    const state = getState();
    const cached = state.users.cached;

    if (cached && !force) {
      return;
    }

    try {
      const users = await readUsers();

      dispatch(setUsers(users));
    } catch (response) {
      console.log(response);
    }
  }
}

// should be in user slice!!
export const getUser = (userId, force = false) => {
  return async (dispatch, getState) => {
    const state = getState();
    const user = state.users.entities[userId];

    if (user !== undefined && force === false) {
      return;
    }

    try {
      const stats = await readUsers(userId);

      dispatch(setUser({
        id: userId,
        stats,
      }));
    } catch (response) {
      // should be logged into a tracking system, like Sentry
      console.log(response);
    };
  }
}

// should be in a users slice!!
export const setUsers = (users) => {
  return {
    type: SET_USERS,
    payload: users,
  };
};


// should be in a user slice!!
export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  }
}
