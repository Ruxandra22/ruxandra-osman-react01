import {
  createProfile,
  createUser,
  deleteProfile,
  deleteUser,
  readProfile,
  readUser,
  updateProfile
} from '../../../api/users';
import {PROFILE_RESET_STATS, PROFILE_SET_COLOR, PROFILE_SET_COLORS, PROFILE_SET_STATS} from "../../types/profile";

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
  return async (dispatch) => {
    let creatureColors = {};

    try {
      creatureColors = await readProfile(userId);
      dispatch(setCreatureColors(creatureColors));

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
};

export const setCreatureColor = (targetProperty, color) => {
  return {
    type: PROFILE_SET_COLOR,
    payload: {
      targetProperty,
      color,
    },
  }
};

export const patchUserProfile = (userId, colors) => {
  return async () => {
    await updateProfile(userId, colors);
  }
};

export const setCreatureColors = (creatureColors) => {
  return {
    type: PROFILE_SET_COLORS,
    payload: creatureColors,
  };
};
