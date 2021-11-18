import {createProfile, createUser, readProfile, readUser} from '../../../api/users';
import {PROFILE_SET_STATS} from "../../types/profile";
import {error} from "autoprefixer/lib/utils";

// getUserStats
export const getUserStats = (userId) => {
  return async (dispatch) => {
    try {
      const stats = await readUser(userId);

      dispatch(setUserStats(stats));

      return stats;
    } catch ({ response }) {
      return Promise.reject(response);
    }
  };
};

export const setUserStats = (stats) => {
  return {
    type: PROFILE_SET_STATS,
    payload: stats,
  }
}

// postUserStats
export const postUserStats = (userId) => {
  return async () => {
    await createUser(userId);
  };
};

// this is a thunk
export const getUserProfile = (userId) => {
  return async () => {
    let creatureColors = {};

    try {
      creatureColors = await readProfile(userId);
      // set colors in state

      return creatureColors;
    } catch (_) {
      const response = error.response;
      return Promise.reject(response);
    }
  }
};

export const postUserProfile = (userId) => {
  return async (_, getState) => {
    const { profile } = getState();

    await createProfile(userId, profile.creature);
  }
}
