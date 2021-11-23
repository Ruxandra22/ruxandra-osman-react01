import {PROFILE_RESET_STATS, PROFILE_SET_COLOR, PROFILE_SET_COLORS, PROFILE_SET_STATS} from "../actions/types/profile";

const initialState = {
  stats: {
    gamesWon: 0,
    gamesLost: 0,
    gamesPlayed: 0,
  },
  creature: {
    mainColor: '#ffabce',
    secondaryColor: '#ff7bad',
    eyeColor: '#000000',
  }
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_SET_STATS:
      return {
        ...state,
        stats: payload,
      }
    case PROFILE_RESET_STATS:
      return {
        ...state,
        stats: initialState.stats,
        creature: initialState.creature,
      };
    case PROFILE_SET_COLOR:
      return {
        ...state,
        creature: {
          ...state.creature,
          [payload.targetProperty]: payload.color,
        },
      };
    case PROFILE_SET_COLORS:
      return {
        ...state,
        creature: payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
