import {createProfile, createUser, deleteProfile, deleteUser, readProfile, readUser} from '../../../api/users';
import {PROFILE_RESET_STATS, PROFILE_SET_STATS} from "../../types/profile";

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

export const resetUserStats = () => {
  return {
    type: PROFILE_RESET_STATS,
  }
}

// postUserStats
export const postUserStats = (userId) => {
  return async () => {
    try {
      await createUser(userId);
    } catch ({ response }) {
      return Promise.reject(response);
    }
  };
};

// deleteUserStats
export const deleteUserStats = (userId) => {
  return async (dispatch) => {
    try {
      await deleteUser(userId);
      dispatch(resetUserStats());
    } catch ({ response }) {
      return Promise.reject(response);
    }
  }
}

// this is a thunk
export const getUserProfile = (userId) => {
  return async () => {
    let creatureColors = {};

    try {
      creatureColors = await readProfile(userId);
      // set colors in state

      return creatureColors;
    } catch (error) {
      const response = error.response;
      return Promise.reject(response);
    }
  }
};

export const postUserProfile = (userId) => {
  return async (_, getState) => {
    try {
      const { profile } = getState();

      await createProfile(userId, profile.creature);
    } catch ({ response }) {
      return Promise.reject(response);
    }
  }
}

export const deleteUserProfile = (userId) => {
  return async () => {
    try {
      await deleteProfile(userId);
    } catch ({ response }) {
      return Promise.reject(response);
    }
  }
}
